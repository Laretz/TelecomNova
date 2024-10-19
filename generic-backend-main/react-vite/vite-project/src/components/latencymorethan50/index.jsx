import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LatencyMoreThan50GraphComponent = () => {
  const [data, setData] = useState([["Cliente", "Quantidade"]]);   // cabeçalho do grafico
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/latencyMoreThan50Clientes");
        const result = await response.json();

        
        
        const clientData = {};

        // cotar quantos items tem para cada cliente 
        result.forEach((item) => {
          const clientName = item.customer.name;
          if (!clientData[clientName]) {
            clientData[clientName] = 0;
          }
          clientData[clientName] += 1;
        });

        // formata data para p piechart
        const formattedData = [["Cliente", "Quantidade"]];
        Object.keys(clientData).forEach((client) => {
          formattedData.push([client, clientData[client]]);
        });

        setData(formattedData);  // define os dados para o grafico
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  const options = {    //options do grafico
    title: "Métricas que a latência foi acima de 50ms por Cliente",
    is3D: true, 
  };

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"280"}
    />
  );
};

export default LatencyMoreThan50GraphComponent;
