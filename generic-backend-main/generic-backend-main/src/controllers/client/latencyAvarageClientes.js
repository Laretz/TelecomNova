const logger = require("../../custom/logger");
const latencyAvarageClientes = require("../../models/latencyAvarageClientes");

module.exports = {
  async handle(req, res) {
    try {
      const client = await latencyAvarageClientes.execute();

      logger.info("successfully found client with the most improvement in latency");
      res.status(200).json(client);
    } catch (error) {
      if (!error.path) {
      // informa o caminho do erro se não tiver
        error.path = "src/controllers/client/latencyAvarageClientesController.js";
      }
      throw error;
    }
  },
};
