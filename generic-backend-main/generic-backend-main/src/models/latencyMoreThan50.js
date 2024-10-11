const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      let clientes = await prisma.metrics.findMany({
        where: {
          latency: {
                gt: 50  
          }
        },
        select: {
          latency: true,
          customer: {
            select: {
              name: true
            }
          }
        }
      });
      return clientes;
    } catch (error) {
      // Tratamento de erros
      error.path = "src/models/latencyMoreThan50.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
