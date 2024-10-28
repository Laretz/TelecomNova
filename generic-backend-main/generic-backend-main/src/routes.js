const { Router } = require("express");

const findByIdClientesController = require("./controllers/client/findManyClientes");
const latencyMoreThan50Clientes = require("./controllers/client/latencyMoreThan50Clientes");
const packetLossAvgClientes = require("./controllers/client/packetLossAvgClientes");
const latencyAvarageClientes = require ("./controllers/client/latencyAvarageClientes");
const findDisponibility = require ("./controllers/client/findDisponibility");
const findtrafficGbs = require ("./controllers/client/findtrafficGbs");



const routes = Router();

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle);

routes.get("/latencyMoreThan50Clientes", latencyMoreThan50Clientes.handle);
// define que quando essa url for acessada com get, o metodo handle sera executado
routes.get("/packetLossAvgClientes", packetLossAvgClientes.handle);

routes.get("/latencyAvarageClientes", latencyAvarageClientes.handle)

routes.get("/findDisponibility", findDisponibility.handle)

routes.get("/findtrafficGbs", findtrafficGbs.handle)




module.exports = routes;
