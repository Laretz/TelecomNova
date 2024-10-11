const { Router } = require("express");

const findByIdClientesController = require("./controllers/client/findManyClientes");
const latencyMoreThan50 = require("./controllers/client/latencyMoreThan50");
const packetLossRate = require("./controllers/client/packetLossRate");



const routes = Router();

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle);

routes.get("/latencyMoreThan50", latencyMoreThan50.handle);

routes.get("/packetLossRate", packetLossRate.handle);


module.exports = routes;
