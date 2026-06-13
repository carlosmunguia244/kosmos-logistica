const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vehiculos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vehículos', error });
    }
});

router.post('/', async (req, res) => {
    const { placa, modelo, anio, capacidad_kg } = req.body;
    if (!placa || !modelo || !anio || !capacidad_kg) return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    try {
        const [result] = await db.query(
            'INSERT INTO vehiculos (placa, modelo, anio, capacidad_kg) VALUES (?, ?, ?, ?)', 
            [placa.trim(), modelo.trim(), anio, capacidad_kg]
        );
        res.status(201).json({ id: result.insertId, placa, modelo, anio });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear vehículo', error });
    }
});

// Actualizado con estatus
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { placa, modelo, anio, capacidad_kg, estatus } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE vehiculos SET placa = ?, modelo = ?, anio = ?, capacidad_kg = ?, estatus = ? WHERE id = ?',
            [placa.trim(), modelo.trim(), anio, capacidad_kg, estatus, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Vehículo no encontrado' });
        res.json({ message: 'Vehículo actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar vehículo', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM vehiculos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Vehículo eliminado' });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(409).json({ message: 'No se puede eliminar el vehículo porque tiene viajes registrados.' });
        } else {
            res.status(500).json({ message: 'Error al eliminar', error });
        }
    }
});

module.exports = router;