// controllers/categorias.controller.js
const db = require("../db/db"); // Importa BD

// Obtener todas las categorías
const getCategorias = (req, res) => {
    const sql = "SELECT * FROM categorias";
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener categorías" });
        }
        res.json(results);
    });
};

// Obtener una categoría por ID
const getCategoriaById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener la categoría" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json(results[0]);
    });
};

// Crear una nueva categoría POST
const createCategoria = (req, res) => {
    const { nombre_categoria } = req.body;
    const sql = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
    db.query(sql, [nombre_categoria], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear la categoría" });
        }
        res.status(201).json({ id_categoria: result.insertId, nombre_categoria });
    });
};

// Actualizar una categoría existente PUT
const updateCategoria = (req, res) => {
    const { id } = req.params;
    const { nombre_categoria } = req.body;
    const sql = "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?";
    db.query(sql, [nombre_categoria, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar la categoría" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json({ id_categoria: id, nombre_categoria });
    });
};

// Eliminar una categoría DELETE
const deleteCategoria = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM categorias WHERE id_categoria = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar la categoría" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json({ message: "Categoría eliminada correctamente" });
    });
};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};
