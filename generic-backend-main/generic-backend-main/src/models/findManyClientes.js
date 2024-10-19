const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      let clientesPorMetricas = await prisma.metrics.groupBy({
        by: ['customerId'],
        _avg: {
          packetLoss: true,
          latency: true,
        },
        _max: {
          latency: true,
        },
        where: {
          ping: {
            not: false,
          },
        },
      });

        
      let clientes = await Promise.all(
        clientesPorMetricas.map(async (grupo) => {
          const clienteDetalhes = await prisma.customers.findUnique({
            where: {
              id: grupo.customerId,
            },
            include: {
              Metrics: {
                select: {
                  id: true,
                  date: true,
                  latency: true,
                  packetLoss: true,
                  ping: true,
                },
              },
            },
          });


          let dadosCliente = {
            customerId: grupo.customerId,
            customerName: clienteDetalhes ? clienteDetalhes.name : null,
            perfil: clienteDetalhes ? clienteDetalhes.perfil : null, 
            avgLatency: grupo._avg.latency, 
            avgPacketLoss: grupo._avg.packetLoss, 
            maxLatency: grupo._max.latency, 
          };


          switch (clienteDetalhes.perfil) {
            case 1:
              dadosCliente.metrics = clienteDetalhes.Metrics.map((metrica) => ({
                ping: metrica.ping,
              }));
              break;

            case 2:
              dadosCliente.metrics = clienteDetalhes.Metrics.map((metrica) => ({
                ping: metrica.ping,
                packetLoss: metrica.packetLoss,
              }));
              break;

              case 3: 

                
                const totalMetrics = clienteDetalhes.Metrics.length; 
                const successfulPings = clienteDetalhes.Metrics.filter(metrica => metrica.ping).length; 
                const disponibilidade = (successfulPings / totalMetrics) * 100; 

                dadosCliente.disponibilidade = disponibilidade.toFixed(2) + '%';

                dadosCliente.metrics = clienteDetalhes.Metrics.map((metrica) => ({
                  ping: metrica.ping,
                  latency: metrica.latency,
                  latencyStatus:
                    metrica.latency <= 50
                      ? "Latência dentro dos padrões (<= 50ms)"
                      : "Latência fora de padrão (> 50ms)",
                }));

              break;
          }


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
