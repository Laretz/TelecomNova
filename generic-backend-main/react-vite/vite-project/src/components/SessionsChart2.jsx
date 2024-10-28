import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { getTraffic } from '../api/server'; 

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

export default function SessionsChart2() {
  const theme = useTheme();
  const [dadosGraph, setDadosGraph] = useState([]);
  const [loading, setLoading] = useState(true);
  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTraffic(); 
        
        const combinedData = data.map(item => ({
          date: item.date,
          traffic: item.traffic,
          name: item.name
        }));
        setDadosGraph(combinedData);

    

      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6">Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

   // Filtrar os dados, pois o dadosgraph tem valor para os 2 clientes, assim fica um array para cada cliente apenas para exibir no grafico (tinha duas datas com horas iguais, uma para cara cliente)
const linkSphereData = dadosGraph.filter(item => item.name === 'LinkSphere');
const netFusionData = dadosGraph.filter(item => item.name === 'NetFusion');

// Filtra datas repetidas para poder usar no eixo X
const uniqueDates = dadosGraph.filter((item, index, self) => 
  index === self.findIndex((t) => (
    t.date === item.date
  ))
);





  return (
<Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
        Tráfego da interface (medição por min, perfil 3)
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
            <Typography variant="h4" component="p">
            </Typography>
          </Stack>
          <Typography variant="h8" sx={{ color: 'text.secondary' }}>
            GB/s

          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          
          xAxis={[
            {
              scaleType: 'time',
              data: uniqueDates.map(item => new Date(item.date)), 
/*               tickInterval: (index, i) => i % Math.ceil(dadosGraph.length / 100) === 0,  */
         
            },
          ]}
          series={[
            {
              id: 'netFusion',
              label: 'NetFusion',
              showMark: false,
              curve: 'linear',
              stack: false,
              area: false,
              stackOrder: 'ascending',
              data: netFusionData.map(item => item.traffic), 
            },
            {
              id: 'linkSphere',
              label: 'LinkSphere',
              showMark: false,
              curve: 'smooth',
              stack: 'total',
              area: false,
              stackOrder: 'ascending',
              data: linkSphereData.map(item => item.traffic), 
            },
          ]}
          
  
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }} 

          grid={{ horizontal: true }}
          
          slotProps={{
            legend: {
              hidden: false,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart>
      </CardContent>
    </Card>
  );
}