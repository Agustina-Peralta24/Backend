// routes/categorias.router.js
const express = require('express');
const router = express.Router();
const categoriasController = require('../Controller/categorias.controller.js');

//METODO GET para todas las categorias
router.get('/', categoriasController.getCategorias); 

//METODO GET BY ID
router.get('/:id', categoriasController.getCategoriaById); 

//METODO POST
router.post('/', categoriasController.createCategoria); 

//METODO PUT
router.put('/:id', categoriasController.updateCategoria); 

//METODO DELETE
router.delete('/:id', categoriasController.deleteCategoria); 

//Exporta los routers
module.exports = router;
