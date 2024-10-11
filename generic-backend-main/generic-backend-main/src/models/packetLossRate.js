const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    async execute() {
      try {
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
  