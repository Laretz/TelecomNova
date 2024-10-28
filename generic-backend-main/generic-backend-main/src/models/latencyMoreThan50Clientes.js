const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      // pega todos os clientes que a latencia seja maior que 50 e traz apenas a latencia e o nome do customer, evitando carregar informações denecessarias
      let clientes = await prisma.metrics.findMany({
        where: {
          latency: {
                gt: 50  
          },
          customer: {
            perfil: {
              equals: 3, 
            },
          },
        },
        orderBy: 
        {
          date: 'asc' 
         },
        select: {
          latency: true,
          date: true,
          customer: {
            select: {
              name: true
            }
          }
        },
      });
      return clientes;
    } catch (error) {
      // Tratamento de erros
      error.path = "src/models/latencyMoreThan50Clientes.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
