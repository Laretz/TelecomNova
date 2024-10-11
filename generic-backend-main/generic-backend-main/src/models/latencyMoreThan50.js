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
        include: {
          customer: true 
        }
      });
      return clientes;
    } catch (error) {
      // Tratamento de erros
      error.path = "src/models/latencyMoreThan50.js";
      console.log(error)
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
