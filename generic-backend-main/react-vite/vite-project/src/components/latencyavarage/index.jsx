import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const LatencyAvarageGraphComponent = () => {
  const [data, setData] = useState([["DateTime"]]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3333/latencyAvarageClientes'); 
      const result = await response.json();
      console.log("Dados recebidos do backend", result);
      
      // Processar os dados para o gráfico
      const formattedData = processLatencyData(result);

      // Atualiza os dados do gráfico
      setData(formattedData);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar os dados.');
      setLoading(false);
    }
  };

  // funçao para processar os dados da API + arredondar hora 
  const processLatencyData = (apiData) => {
    const dates = {}; 


    const roundToHour = (date) => {
      const d = new Date(date);
      d.setMinutes(0, 0, 0); 
      return d;
    };

    // processar cada cliente e suas métricas
    apiData.forEach(client => {
      client.customerDetails.Metrics.forEach(metric => {
        const roundedDate = roundToHour(metric.date).toLocaleString(); 
        
        if (!dates[roundedDate]) {
          dates[roundedDate] = {};
        }

        // aqui a gente esta organizando para diminuir os valores de latencia, para o grafico nao ficar muito cheio de valores, criamos uma media delatencia por hora
        if (!dates[roundedDate][client.customerDetails.name]) {
          dates[roundedDate][client.customerDetails.name] = { total: 0, count: 0 };
        }

       
        dates[roundedDate][client.customerDetails.name].total += metric.latency;
        dates[roundedDate][client.customerDetails.name].count += 1;
      });
    });

    // formatar os dados para o Google Charts
    const formattedData = [["DateTime", ...apiData.map(client => client.customerDetails.name)]];

    Object.keys(dates).forEach(roundedDate => {
      const row = [roundedDate];

  
      apiData.forEach(client => {
        const clientData = dates[roundedDate][client.customerDetails.name];
        if (clientData) {
          row.push(clientData.total / clientData.count); 
        } else {
          row.push(null);
        }
      });

      formattedData.push(row);
    });

    console.log("Dados formatados para o gráfico", formattedData);

    return formattedData;
  };

  // para exibir apenas uma vez os dados da api
  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

                                                        // opçioes do gráfico
  const options = {
    chart: {
      title: "Latência Média dos Clientes ao Longo do Tempo",
      subtitle: "Variação da latência para cada cliente",
    },
    hAxis: {
      title: "Data e Hora",
      slantedText: true,
      textPosition: 'none',
    },
    vAxis: {
      title: "Latência (ms)",
    },
    curveType: "function", 
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default LatencyAvarageGraphComponent;
