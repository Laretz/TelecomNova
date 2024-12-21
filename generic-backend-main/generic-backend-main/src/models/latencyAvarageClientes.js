const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
    

      // nessa parte do codigo, ele agrupo as metricas pelo costumerID e calcula a media de latencia para cada grupo nos ultimos 7 dias e também deixa em ordem crescente 
      let clientesPorMediaDeLatencia = await prisma.metrics.groupBy({
        by: ['customerId'],
        _avg: {
          latency: true,
        },
        where: {
          latency: {
            not: null,
          },
        },
        orderBy: {
          _avg: {
            latency: 'asc',
          },
        }
      });
      // nessa segunda parte, para cada grupo em clientesPorMediaDeLatencia que a gente ja obteve, buscamos algumas metricas necesarias: id data e latencia
      let clientes = await Promise.all(
        clientesPorMediaDeLatencia.map(async (grupo) => {
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
                }
              },
            },
          });
          return {  //no retorno ele ta retornando um objeto com essas 3 atributos para cada grupo
            avgLatency: grupo._avg.latency, 
            customerDetails: clienteDetalhes, 
          };
        })
      );

      return clientes; 
    } catch (error) {
      // Tratamento de erros
      error.path = "src/models/packetLossAvgClientes.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
