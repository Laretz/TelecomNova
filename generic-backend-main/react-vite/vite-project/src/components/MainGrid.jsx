import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedDataGrid from './CustomizedDataGrid';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import SessionsChart2 from './SessionsChart2';
import StatCard from './StatCard';
import { getLatencyGt50 } from '../api/server';
import { useState, useEffect } from 'react';
 

export default function MainGrid() {
 const [dadosGraph, setdataGraph] = useState([])
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getLatencyGt50();

      const combinedData = data.map(item => ({
        date: item.date,
        latency: item.latency,
        name: item.customer.name
      }))
      setdataGraph(combinedData);
      console.log("dadosgraph", combinedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };
  fetchData();
}, []);
if (loading) {
  return <div>Loading...</div>;
}
if (error) {
  return <div>Error: {error}</div>;
}
const linkSphereData = dadosGraph.filter(item => item.name === 'LinkSphere');
const netFusionData = dadosGraph.filter(item => item.name === 'NetFusion');

/* console.log(linkSphereData);
console.log(netFusionData); */

const countByDateLinkSphere = {};
const countByDateNetFusionData = {};

linkSphereData.forEach(item => {
    const dataLink = item.date.split('T')[0];

    if (countByDateLinkSphere[dataLink]) {
      countByDateLinkSphere[dataLink]++;
    } else {

      countByDateLinkSphere[dataLink] = 1;
    }
});

netFusionData.forEach(item => {
  const dataFusion = item.date.split('T')[0];

  if (countByDateNetFusionData[dataFusion]) {
    countByDateNetFusionData[dataFusion]++;
  } else {

    countByDateNetFusionData[dataFusion] = 1;
  }
});


// um contador de latencia>50 para cada cliente
const countsArrayLinkSphere = Object.values(countByDateLinkSphere);
const totalLatenciasAltasSphere   = countsArrayLinkSphere.reduce((acc, curr) => acc + curr, 0);

const countsArrayNetFusion = Object.values(countByDateNetFusionData);
const totalLatenciasAltasFusion = countsArrayNetFusion.reduce((acc, curr) => acc + curr, 0);
// conferindo dados
console.log("Contagens:", countsArrayLinkSphere);
console.log("Contagens:", countsArrayNetFusion);


const data = [
  {
    title: 'LinkSphere',
    value: totalLatenciasAltasSphere ,
    interval: 'Qnt de Latência >50 ',
    trend: 'down',
    data: countsArrayLinkSphere
  }, 
  {
    title: 'NetFusion',
    value: totalLatenciasAltasFusion,
    interval: 'Qnt de Latência >50   ',
    trend: 'down',
    data: countsArrayNetFusion,
  },

];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
        
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
            
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6}}>
          <PageViewsBarChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6}}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6}}>
          <SessionsChart2 />
        </Grid> 
        <Grid size={{ xs: 12, md: 3}}>

        </Grid> 
        <Grid size={{ xs: 12, md: 3}}>
   
        </Grid> 
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>

    </Box>
  );
}