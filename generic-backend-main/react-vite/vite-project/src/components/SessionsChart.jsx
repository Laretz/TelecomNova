import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { latencyAvarageClientes } from '../api/server';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const processLatencyData = (apiData) => {
  const dates = {};

  const roundToHour = (date) => {
    const d = new Date(date);
    d.setMinutes(0, 0, 0);
    return d;
  };

  apiData.forEach((client) => {
    client.customerDetails.Metrics.forEach((metric) => {
      const roundedDate = roundToHour(metric.date).toLocaleString();

      if (!dates[roundedDate]) {
        dates[roundedDate] = {};
      }

      if (!dates[roundedDate][client.customerDetails.name]) {
        dates[roundedDate][client.customerDetails.name] = { total: 0, count: 0 };
      }

      dates[roundedDate][client.customerDetails.name].total += metric.latency;
      dates[roundedDate][client.customerDetails.name].count += 1;
    });
  });

  const formattedData = [["DateTime", ...apiData.map((client) => client.customerDetails.name)]];

  Object.keys(dates).forEach((roundedDate) => {
    const row = [roundedDate];

    apiData.forEach((client) => {
      const clientData = dates[roundedDate][client.customerDetails.name];
      if (clientData) {
        row.push(clientData.total / clientData.count);
      } else {
        row.push(null);
      }
    });

    formattedData.push(row);
  });
  return formattedData;
};

export default function SessionsChart() {
  const theme = useTheme();
  const [dadosGraph, setDadosGraph] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await latencyAvarageClientes();
        const graphDados = processLatencyData(data);
        setDadosGraph(graphDados);
        setLoading(false); 
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const colorPalette = [
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.secondary.dark,
    theme.palette.primary.light,
  ];

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (!dadosGraph.length || !dadosGraph[0]) {
    return <div>Carregando dados..</div>;
  }
/*  console.log(dadosGraph); */
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
         Variação de Latência por Cliente
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
          </Stack>
          <Typography variant="h8" sx={{ color: 'text.secondary' }}>
            Média de latência por hora dos últimos dias
          </Typography>
        </Stack>
        <LineChart
       /*    dataset={dadosGraph} */
       slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'top', horizontal: 'middle' },
          padding: 0,
        },
      }}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: dadosGraph.map((item, index) => (index > 0 ? item[0] : null)),
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          
          grid={{ horizontal: true }}
          series={[
            {
              id: 'cliente1',
              label: dadosGraph[0][1],
              showMark: false,
              lineWidth: 1.5,
              curve: 'smooth',
              area: false,
              data: dadosGraph.slice(1).map((item) => item[1]),
            },
            {
              id: 'cliente2',
              label: dadosGraph[0][2],
              showMark: false,
              lineWidth: 2.5,
              curve: 'smooth',
              area: false,
              data: dadosGraph.slice(1).map((item) => item[2]),
            },
            {
              id: 'cliente3',
              label: dadosGraph[0][3],
              showMark: false,
              lineWidth: 2.5,
              curve: 'smooth',
              area: false,
              data: dadosGraph.slice(1).map((item) => item[3]),
            },
            {
              id: 'cliente4',
              label: dadosGraph[0][4],
              showMark: false,
              lineWidth: 2.5,
              curve: 'smooth',
              area: false,
              data: dadosGraph.slice(1).map((item) => item[4]),
            },
            {
              id: 'cliente5',
              label: dadosGraph[0][5],
              showMark: false,
              lineWidth: 1,
              curve: 'smooth',
              area: false,
              data: dadosGraph.slice(1).map((item) => item[5]),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
