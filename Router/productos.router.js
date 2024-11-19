//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../Controller/productos.controller");

//METODO GET
//para todos los productos
router.get('/',controller.getProductos);

//METODO GET BY ID
router.get('/:id',controller.getProductoById);

//METODO POST
router.post('/', controller.createProducto);

// METODO PUT 
router.put('/:id', controller.updateProducto);

//METODO DELETE
router.delete('/:id', controller.deleteProducto);

//Exporta las rutas
module.exports= router;

