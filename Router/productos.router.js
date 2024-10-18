//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../Controller/productos.controller");

//METODO GET//
//para todos los productos//
router.get('/',controller.allProducts);

//para un producto
router.get('/:id',controller.showProducts);

//METODO POST//
router.post('/', controller.storeProducts);


//// METODO PUT  ////
router.put('/:id', controller.updateProductos);


///// METODO DELETE ////
router.delete('/:id', controller.destroyProducto);

//exportar las rutas,routers
module.exports= router;