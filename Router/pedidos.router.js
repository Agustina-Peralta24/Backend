//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../Controller/pedidos.controller.js");

//METODO GET
//para todos los pedidos
router.get('/',controller.getPedidos);

//METODO GET BY ID
router.get('/:id',controller.getPedidosById);

//METODO POST
router.post('/', controller.createPedido);

// METODO PUT 
router.put('/:id', controller.updatePedido);

//METODO DELETE
router.delete('/:id', controller.deletePedido);

//Exporta las rutas
module.exports= router;
