const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const clientes = await prisma.customers.findMany();

      const clientesDisponiveis = await Promise.all(
        clientes.map(async (cliente) => {
          const metrics = await prisma.metrics.findMany({
            where: {
              customerId: cliente.id,
              ping: {
                not: null,
              },
            },
          });

          // aqui estamos medindo a quantidade de pings total e a quantidade que tinha o valor true para calcular a disponibilidade
          const totalPings = metrics.length;
          const pingsConectados = metrics.filter(m => m.ping === true).length;
          const pingsDesconectados = metrics.filter(m => m.ping === false).length;

          if (totalPings === 0) {
            return null; 
          }

         
          const disponibilidade = (pingsConectados / totalPings) * 100;

          return {
            ...cliente,
            disponibilidade: disponibilidade.toFixed(2) + '%',
            pingsDesconectados,
          };
        })
      );

      return clientesDisponiveis.filter(cliente => cliente !== null);

    } catch (error) {
      error.path = "src/models/findDisponibility.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
