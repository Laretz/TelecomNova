const logger = require("../../custom/logger");
const packetLossRate = require("../../models/packetLossAvgClientes");

module.exports = {
    async handle(req, res) {
      try {
        const clients = await packetLossRate.execute();
  
        logger.info("successfully found clients");
        res.status(200).json(clients);
      } catch (error) {
        if (!error.path) {
          // informa o caminho do erro se não tiver
          error.path = "src/controllers/client/packetLossAvgClientesController.js";
        }
        throw error;
      }
    },
  };
  