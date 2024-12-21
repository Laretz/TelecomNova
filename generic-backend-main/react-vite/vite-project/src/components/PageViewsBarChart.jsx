import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getFindDisponibility } from '../api/server';

export default function PageViewsBarChart() {
  const [dadosGraph, setDadosGraph] = useState([]);
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFindDisponibility();
        const combinedData = data.map(item => ({
          name: item.name,
          disp: parseFloat(item.disponibilidade.replace('%', '')) 
        }));
        setDadosGraph(combinedData);
      } catch (error) {
        console.log("error in fetchData", error);
      }
    };
    fetchData();
  }, []);



  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Disponibilidade
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h8" sx={{ color: 'text.secondary' }}>
            Porcentagem de disponibilidade para cada cliente
          </Typography>
        </Stack>
        <BarChart
          dataset={dadosGraph} 
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: dadosGraph.map(item => item.name), 
            },
          ]}
          series={[
            {
              id: 'Disponibilidade',
              label: 'Disponibilidade',
              data: dadosGraph.map(item => item.disp), 
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
