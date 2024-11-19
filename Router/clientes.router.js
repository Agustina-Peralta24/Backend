//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../Controller/clientes.controller");

//METODO GET
//para todos los clientes
router.get('/',controller.getClientes);

//METODO GET BY ID
router.get('/:id',controller.getClienteById);

//METODO POST
router.post('/', controller.createCliente);

// METODO PUT 
router.put('/:id', controller.updateCliente);

//METODO DELETE
router.delete('/:id', controller.deleteCliente);

//Exporta las rutas
module.exports= router;