const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    async execute() {
      try {
        // pega os dados onde o packetloss nao é nulo e ordena do maior para o menor, e pega os 3 primerios, exibindo 3 maiores valor de packetloss
        let clientes = await prisma.metrics.findMany({
          orderBy: {
            packetLoss: 'desc',
          },
          where: {
            packetLoss: {
              not: null
            }
          },
          include: {
            customer: true
          },
          take : 3
        });
  
        return clientes;
      } catch (error) {
        // ... tratamento de erros ...
        error.path = "src/models/packetLossRate.js";
        throw error;
      } finally {
        await prisma.$disconnect();
      }
    },
  };
  