// Rutas del módulo para sucursales
const express = require("express");
const router = express.Router();

const controller = require("../Controller/sucursales.controller");

// METODO GET
// Para todas las sucursales
router.get('/', controller.getSucursales);

// METODO GET BY ID
router.get('/:id', controller.getSucursalById );

// METODO POST
router.post('/', controller.createSucursal);

// METODO PUT
router.put('/:id', controller.updateSucursal);

// METODO DELETE
router.delete('/:id', controller.deleteSucursal);

// Exporta las rutas
module.exports = router;
