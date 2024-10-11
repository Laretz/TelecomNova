const logger = require("../../custom/logger");
const latencyMoreThan50 = require("../../models/latencyMoreThan50");

module.exports = {
  async handle(req, res) {
    try {
      const clients = await latencyMoreThan50.execute();

      logger.info("successfully found clients");
      res.status(200).json(clients);
    } catch (error) {
      if (!error.path) {
        // Informa o caminho do erro se não tiver
        error.path = "src/controllers/client/latencyMoreThan50Controller.js";
      }
      logger.error(error); // Log do erro, se desejado
      res.status(500).json({ message: "Internal Server Error", path: error.path });
    }
  },
};
