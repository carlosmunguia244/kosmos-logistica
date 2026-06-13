// Módulo de rutas para la gestión de choferes
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Listar todos los choferes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM choferes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener choferes', error });
    }
});

// Crear nuevo chofer con validaciones
router.post('/', async (req, res) => {
    const { nombre, licencia } = req.body;

    // 1. VALIDACIÓN: Verificar que los campos no estén vacíos
    if (!nombre || !licencia) {
        return res.status(400).json({ message: 'Error: El nombre y la licencia son obligatorios.' });
    }

    // 2. VALIDACIÓN: Limpiar espacios en blanco innecesarios
    const nombreLimpio = nombre.trim();
    const licenciaLimpia = licencia.trim();

    try {
        // 3. VALIDACIÓN (Opcional pero recomendada): Verificar si la licencia ya existe
        const [existe] = await db.query('SELECT * FROM choferes WHERE licencia = ?', [licenciaLimpia]);
        if (existe.length > 0) {
            return res.status(409).json({ message: 'Error: Esta licencia ya está registrada.' });
        }

        const [result] = await db.query('INSERT INTO choferes (nombre, licencia) VALUES (?, ?)', [nombreLimpio, licenciaLimpia]);
        res.status(201).json({ id: result.insertId, nombre: nombreLimpio, licencia: licenciaLimpia });
    } catch (error) {
        res.status(500).json({ message: 'Error interno al crear chofer', error });
    }
});

// Actualizar un chofer existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, licencia } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE choferes SET nombre = ?, licencia = ? WHERE id = ?',
            [nombre, licencia, id]
        );
        
        // Verificamos si el registro existía antes de confirmar
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Chofer no encontrado' });
        }
        
        res.json({ message: 'Chofer actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar chofer', error });
    }
});

// Eliminar un chofer
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM choferes WHERE id = ?', [id]);
        res.json({ message: 'Chofer eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar chofer', error });
    }
});

module.exports = router;