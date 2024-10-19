const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      const resultadosComPacketLoss10 = await prisma.metrics.groupBy({
        by: ['customerId'],
        _count: {
          packetLoss: true,
        },
        where: {
          packetLoss: /*10,*/  
          {
            not: 0
          }
        },
      });

      const resultadosComDetalhes = await Promise.all(
        resultadosComPacketLoss10.map(async (resultado) => {
          const cliente = await prisma.customers.findUnique({
            where: {
              id: resultado.customerId,
            },
          });

          return {
            customerId: resultado.customerId,
            packetLoss10Count: resultado._count.packetLoss, 
            customerName: cliente ? cliente.name : null, 
          };
        })
      );

      return resultadosComDetalhes;
    } catch (error) {
      // ... tratamento de erros ...
      error.path = "src/models/packetLossAvgClientes.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
