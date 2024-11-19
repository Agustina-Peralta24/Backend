// controllers/productos.controller.js
const db = require("../db/db");

// Obtener todos los productos GET
const getProductos = (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener productos" });
        }
        res.json(results);
    });
};

// Obtener un producto GET BY ID
const getProductoById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM productos WHERE id_producto = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener el producto" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo producto PUT
const createProducto = (req, res) => {
    const { nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto } = req.body;
    const sql = "INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear el producto" });
        }
        res.status(201).json({ id_producto: result.insertId, nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto });
    });
};

// Actualizar un producto existente POST 
const updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto } = req.body;
    const sql = "UPDATE productos SET nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, id_categoria = ?, disponibilidad_producto = ? WHERE id_producto = ?";
    db.query(sql, [nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el producto" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ id_producto: id, nombre_producto, descripcion_producto, precio_producto, id_categoria, disponibilidad_producto });
    });
};

// Eliminar un producto DELETE
const deleteProducto = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id_producto = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar el producto" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado correctamente" });
    });
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
