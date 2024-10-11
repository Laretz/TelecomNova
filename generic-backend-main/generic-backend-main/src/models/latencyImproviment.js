const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      // Define uma data equivalente a 7 dias atras
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // agrupei as metricas por ID de cliente e ao usar o _avg, o prisma calcula a media da latencia de cada grupo
      //  utilizei  "gte" para trazer valores maiores ou iguais a 7 dias para trazer somentes as metricas mais recentes
      // como a ideia é comparar metricas, também coloquei para nao trazer latencia nula, e apos ordenar de maior pra menor, eu uso o take 1, para trazer o primeiro
      let clientes = await prisma.metrics.groupBy({
        by: ['customerId'],
        _avg: {
          latency: true,
        },
        where: {
          date: {
            gte: sevenDaysAgo,
          },
          latency: {
            not: null,  
          }
        },
        orderBy: {
          _avg: {
            latency: 'asc',  
          },
        },
        take: 1,  
      });
      // pega o primeiro cliente, como esta ordenado é o com maior melhora, e em seguida, inclui as metricas associadas a ele e retorna
      let cliente = await prisma.customers.findUnique({
        where: {
          id: clientes[0].customerId
        },
        include: {
          Metrics: true
        }
      })
      return cliente;
    } catch (error) {
      // Tratamento de erros
      error.path = "src/models/latencyImproviment.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};
