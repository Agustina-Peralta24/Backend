//controler/detallepedido.controller.js
const db = require("../config/db"); 

// Obtener todos los detalles de pedidos
const getDetallePedido = (req, res) => {
    const sql = "SELECT * FROM detalle_pedido";
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los detalles de pedidos" });
        }
        res.status(200).json(results);
    });
};

// Obtener un detalle de pedido por ID
const getDetallePedidoById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM detalle_pedido WHERE id_detalle = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener el detalle de pedido" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Detalle de pedido no encontrado" });
        }
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo detalle de pedido
const createDetallePedido = (req, res) => {
    const { id_pedido, id_producto, cantidad, total } = req.body;
    const sql = "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, total) VALUES (?, ?, ?, ?)";
    db.query(sql, [id_pedido, id_producto, cantidad, total], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear el detalle de pedido" });
        }
        res.status(201).json({
            id_detalle: result.insertId,
            id_pedido,
            id_producto,
            cantidad,
            total
        });
    });
};

// Actualizar un detalle de pedido PUT , no deberia actualizar los id no?
const updateDetallePedido = (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_producto, cantidad, total } = req.body;
    const sql = "UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, total = ? WHERE id_detalle = ?";
    db.query(sql, [id_pedido, id_producto, cantidad, total, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el detalle de pedido" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Detalle de pedido no encontrado" });
        }
        res.status(200).json({ message: "Detalle de pedido actualizado correctamente" });
    });
};

// Eliminar un detalle de pedido
const deleteDetallePedido = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM detalle_pedido WHERE id_detalle = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar el detalle de pedido" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Detalle de pedido no encontrado" });
        }
        res.status(200).json({ message: "Detalle de pedido eliminado correctamente" });
    });
};

module.exports = {
    getDetallePedido,
    getDetallePedidoById,
    createDetallePedido,
    updateDetallePedido,
    deleteDetallePedido
};
