import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const FindDisponibilityGraphComponent = () => {
  const [data, setData] = useState([["Client", "Disponibilidade (%)"]]); // cabeçalho do grafico
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3333/findDisponibility'); 
      const result = await response.json();
      console.log("Dados recebidos do backend", result);

      
      const formattedData = processDisponibilityData(result);


      setData(formattedData);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar os dados.');
      setLoading(false);
    }
  };


  const processDisponibilityData = (apiData) => {
    const formattedData = [["Client", "Disponibilidade (%)"]]; 

    apiData.forEach(client => {
      const disponibilidadePercent = parseFloat(client.disponibilidade.replace('%', '')); 
      formattedData.push([client.name, disponibilidadePercent]); 
    });

    console.log("Dados formatados para o gráfico", formattedData);

    return formattedData;
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const options = {                          //options do grafico
    title: "Disponibilidade dos Clientes",
    hAxis: {
      title: 'Clientes',
    },
    vAxis: {
      title: 'Disponibilidade (%)',
      minValue: 0,
      maxValue: 100,
    },
    chartArea: { width: '50%' }, 
    colors: ['#b0120a'], 
    bar: { groupWidth: "75%" }, 
  };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="280px"
      data={data}
      options={options}
    />
  );
}

export default FindDisponibilityGraphComponent;
