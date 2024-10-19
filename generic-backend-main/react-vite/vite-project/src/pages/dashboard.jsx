import React from 'react';
import PacketLossGraphComponent from '../components/packetloss';
import LatencyAvarageGraphComponent from '../components/latencyavarage';
import LatencyMoreThan50GraphComponent from '../components/latencymorethan50';
import FindDisponibilityGraphComponent from '../components/findDisponibility';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: 2,
        background: 'linear-gradient(to bottom, #e3f2fd, #ffffff)',
      }}
    >
      
      <Typography variant="h4" gutterBottom sx={{ color: "#333" }}>
      TelecomNova Dashboards
      </Typography>

      
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={3}>
        <Box flex={1} display="flex" justifyContent="center">
          <Paper elevation={3} sx={{ padding: 2, width: '80%', height: '90%' }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Gráfico de latencia fora da margem
            </Typography>
            <LatencyMoreThan50GraphComponent />
          </Paper>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <Paper elevation={3} sx={{ padding: 2, width: '80%', height: '90%' }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Gráfico de disponibilidade por cliente
            </Typography>
            <FindDisponibilityGraphComponent />
          </Paper>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <Paper elevation={3} sx={{ padding: 2, width: '80%', height: '90%' }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Gráfico de Perda de Pacotes
            </Typography>
            <PacketLossGraphComponent />
          </Paper>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center"  mt={2}>
        <Paper elevation={3} sx={{ padding: 2, width: '90%', height: '100%' }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Variação de Latência
          </Typography>
          <LatencyAvarageGraphComponent/>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
