const logger = require("../../custom/logger");
const latencyMoreThan50Clientes = require("../../models/latencyMoreThan50Clientes");

module.exports = {
  async handle(req, res) {
    try {
      const clients = await latencyMoreThan50Clientes.execute();

      logger.info("successfully found clients");
      res.status(200).json(clients);
    } catch (error) {
      if (!error.path) {
      // informa o caminho do erro se não tiver
        error.path = "src/controllers/client/latencyMoreThan50ClientesController.js";
      }
      throw error;
    }
  },
};
