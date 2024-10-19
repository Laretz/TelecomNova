import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const PacketLossGraphComponent = () => {
  const [data, setData] = useState([["Cliente", "Quantidade de packetLoss"]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/packetLossAvgClientes");
        const resultados = await response.json();

        // Formatar os dados recebidos
        const formattedData = resultados.map(item => [
          item.customerName || "Unknown", // Nome do cliente
          Number(item.packetLoss10Count) || 0, // Contagem de Packet Loss
        ]);

        // Substituir os dados anteriores, sem duplicação
        setData([["Cliente", "Quantidade de packetLoss"], ...formattedData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // executa apenas uma vez, ao montar o componente


  const options = {                    // options do grafico
    hAxis: {
      title: 'Clientes',
    },
    vAxis: {
      title: 'Quantidade de Packet Loss',
    },
    legend: { position: 'none' }, 
    annotations: {
      alwaysOutside: true, 
      textStyle: {
        color: '#000', 
        fontSize: 12, 
      },
    },
  };

  return (
    <div>
      <Chart
        chartType="Bar" 
        width="100%"
        height="280px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default PacketLossGraphComponent;
