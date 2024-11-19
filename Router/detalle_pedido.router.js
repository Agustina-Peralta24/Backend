const express = require("express");
const router = express.Router();

const controller = require("../Controller/detalle_pedido.controller");

// METODO GET - Todos los detalles de pedidos
router.get('/', controller.getDetallePedido);

// METODO GET BY ID - Detalle de pedido por ID
router.get('/:id', controller.getDetallePedidoById);

// METODO POST - Crear un nuevo detalle de pedido
router.post('/', controller.createDetallePedido);

// METODO PUT - Actualizar un detalle de pedido
router.put('/:id', controller.updateDetallePedido);

// METODO DELETE - Eliminar un detalle de pedido
router.delete('/:id', controller.deleteDetallePedido);

module.exports = router;
