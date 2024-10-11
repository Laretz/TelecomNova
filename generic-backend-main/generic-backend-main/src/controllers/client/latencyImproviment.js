const logger = require("../../custom/logger");
const latencyImproviment = require("../../models/latencyImproviment");

module.exports = {
  async handle(req, res) {
    try {
      const client = await latencyImproviment.execute();

      logger.info("successfully found client with the most improvement in latency");
      res.status(200).json(client);
    } catch (error) {
      if (!error.path) {
      // informa o caminho do erro se não tiver
        error.path = "src/controllers/client/latencyImproviment.js";
      }
      throw error;
    }
  },
};
