const logger = require("../../custom/logger");
const packetLossRate = require("../../models/packetLossRate");

module.exports = {
    async handle(req, res) {
      try {
        const clients = await packetLossRate.execute();
  
        logger.info("successfully found clients");
        res.status(200).json(clients);
      } catch (error) {
        if (!error.path) {
          // Informa o caminho do erro se não tiver
          error.path = "src/controllers/client/packetLossRate.js";
        }
        throw error;
      }
    },
  };
  