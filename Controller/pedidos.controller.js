// controllers/pedidos.controller.js
const db = require("../db/db");

// Obtener todos los pedidos GET
const getPedidos = (req, res) => {
    const sql = "SELECT * FROM pedidos" ;
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener pedidos" });
        }
        res.json(results);
    });
};

// Obtener un pedido GET BY ID
const getPedidosById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM pedidos WHERE id_pedido = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener el pedido" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json(results[0]);
    });
}; 

// Crear un nuevo pedido POST ////fecha_pedido es timestamp, se pone acá?////
const createPedido = (req, res) => {
    const { id_cliente, id_sucursal } = req.body;
    const sql = "INSERT INTO productos ( id_cliente, id_sucursal) VALUES (?, ?)";
    db.query(sql, [ id_cliente, id_sucursal], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear el producto" });
        }
        res.status(201).json({ id_pedido: result.insertId, id_cliente, id_sucursal });
    });
};

//////////// ACA TENGO DUDAS SOBRE EDITAR LOS PEDIDOS, va fecha? que modificaria sin romper todo? los id tmb? //////////// 
// Actualizar un pedido existente PUT 
const updatePedido = (req, res) => {
    const { id } = req.params;
    const { id_cliente, id_sucursal} = req.body;
    const sql = "UPDATE pedidos SET id_cliente = ?, id_sucursal = ? WHERE id_pedido = ?";
    db.query(sql, [ id_cliente, id_sucursal , id ], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el pedido" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json({ id_pedido: id, fecha_pedido, id_cliente, id_sucursal });
    });
};

// Eliminar un pedido DELETE
const deletePedido = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM pedidos WHERE id_pedido = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar el pedido" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido eliminado correctamente" });
    });
};

module.exports = {
    getPedidos,
    getPedidosById,
    createPedido,
    updatePedido,
    deletePedido
};
