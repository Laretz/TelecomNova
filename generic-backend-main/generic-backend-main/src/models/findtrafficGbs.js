const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      const clientes = await prisma.metrics.findMany({
        where: {
          traffic: {
            not: null,
          },
          customer: {
            perfil: {
              equals: 3,
            }
          }
        },
        orderBy: {
          date: 'asc'
        },
        select: {
          traffic: true,
          date: true,
          customer: {
            select: {
              name: true,
            },
          },
        },
      });


      const result = clientes.map(item => ({
        date: item.date, 
        traffic: item.traffic, 
        name: item.customer.name, 
      }));

      return result;
    } catch (error) {
      error.path = "src/models/findTrafficGbs.js"; 
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
