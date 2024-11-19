// controllers/sucursales.controller.js
const db = require("../db/db");

// Obtener todas las sucursales GET
const getSucursales = (req, res) => {
    const sql = "SELECT * FROM sucursales";
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener sucursales" });
        }
        res.json(results);
    });
};

// Obtener una sucursal GET BY ID
const getSucursalById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM sucursales WHERE id_sucursal = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener la sucursal" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Sucursal no encontrada" });
        }
        res.json(results[0]);
    });
};


// Crear una nueva sucursal POST
const createSucursal = (req, res) => {
    const { nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal } = req.body;

    const sql = "INSERT INTO sucursales (nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear la sucursal" });
        }
        res.status(201).json({
            id_sucursal: result.insertId,
            nombre_sucursal,
            calle_sucursal,
            altura_sucursal,
            telefono_sucursal,
            email_sucursal
        });
    });
};

// Actualizar una nueva sucursal PUT
const updateSucursal = (req, res) => {
    const { nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal } = req.body;
    
    const sql = "INSERT INTO sucursales (nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear la sucursal" });
        }
        res.status(201).json({
            id_sucursal: result.insertId, nombre_sucursal, calle_sucursal, altura_sucursal, telefono_sucursal, email_sucursal
        });
    });
};

// Eliminar una sucursal - DELETE
const deleteSucursal = (req, res) => {
    const { id_sucursal } = req.params;

    const sql = "DELETE FROM sucursales WHERE id_sucursal = ?";

    db.query(sql, [id_sucursal], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar la sucursal" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Sucursal no encontrada" });
        }
        res.status(200).json({ message: "Sucursal eliminada correctamente" });
    });
};


module.exports = {
    getSucursales,
    getSucursalById,
    createSucursal,
    updateSucursal,
    deleteSucursal
};
