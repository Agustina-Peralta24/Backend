// controllers/clientes.controller.js
const db = require("../db/db");

// Obtener todos los clientes GET
const getClientes = (req, res) => {
    const sql = "SELECT * FROM clientes";
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener clientes" });
        }
        res.json(results);
    });
};

// Obtener un cliente GET BY ID
const getClienteById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM clientes WHERE id_cliente = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener el cliente" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo cliente POST
const createCliente = (req, res) => {
    console.log(req.file);
    let imageName = "";

    if (req.file) {
        imageName = req.file.filename;
    };

    const { nombre_cliente, apellido_cliente, telefono_cliente, email_cliente } = req.body;
    const sql = "INSERT INTO clientes (nombre_cliente, apellido_cliente, telefono_cliente, email_cliente, imagen) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre_cliente, apellido_cliente, telefono_cliente, email_cliente, imageName], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear el producto" });
        }
        res.status(201).json({ id_cliente: result.insertId, nombre_cliente, apellido_cliente, telefono_cliente, email_cliente, imageName});
    });
};

// Actualizar un cliente existente PUT 
const updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, apellido_cliente, telefono_cliente, email_cliente } = req.body;
    const sql = "UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, telefono_cliente = ?, email_cliente = ? WHERE id_producto = ?";
    db.query(sql, [nombre_cliente, apellido_cliente, telefono_cliente, email_cliente, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el cliente" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json({ id_cliente: id, nombre_cliente, apellido_cliente, telefono_cliente, email_cliente });
    });
};

// Eliminar un producto DELETE
const deleteCliente = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM cliente WHERE id_cliente = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar el cliente" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json({ message: "Cliente eliminado correctamente" });
    });
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
