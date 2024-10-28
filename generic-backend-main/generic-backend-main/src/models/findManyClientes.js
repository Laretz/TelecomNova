const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      const clientesPorMetricas = await prisma.metrics.groupBy({
        by: ['customerId'],
        _avg: {
          latency: true,
          packetLoss: true,
          traffic: true,
        },
        _max: {
          latency: true,
          packetLoss: true,
        },
        where: {
          ping: {
            not: null, 
            not: false, 
          },
          latency:
          {
            gte: 0,
          }
        },
      });

      let clientes = await Promise.all(
        clientesPorMetricas.map(async (grupo) => {
          const clienteDetalhes = await prisma.customers.findUnique({
            where: {
              id: grupo.customerId,
            },
            select: {
              name: true,
              perfil: true,
            },
          });

  
          const todasMetrics = await prisma.metrics.findMany({
            where: {
              customerId: grupo.customerId,
              ping: {
                not: null,
                not: false,
              },
            },
          });

      
          const latenciasValidas = todasMetrics.filter(metrica => metrica.latency > 0);
          const latenciasAcimaDe50 = latenciasValidas.filter(metrica => metrica.latency > 50).length;


    

          let dadosCliente = {
            customerId: grupo.customerId,
            Nome: clienteDetalhes ? clienteDetalhes.name : null,
            Perfil: clienteDetalhes ? clienteDetalhes.perfil : null,  
            MediaDeLatencia: grupo._avg.latency.toFixed(3),
            MaiorLatencia: grupo._max.latency,
            QntLatenciaElevada: latenciasAcimaDe50,
            MaiorPacketLoss: grupo._max.packetLoss,
            MediaPacketloss: grupo._avg.packetLoss.toFixed(3),
            MediaTrafegoGbs: grupo._avg.traffic.toFixed(3),
          };

          return dadosCliente;
        })
      );

      return clientes;
    } catch (error) {
      // Tratamento de erros
      error.path = "src/models/perfisClientes.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
