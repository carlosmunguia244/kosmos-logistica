const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM choferes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener choferes', error });
    }
});

router.post('/', async (req, res) => {
    const { nombre, licencia } = req.body;
    if (!nombre || !licencia) return res.status(400).json({ message: 'Nombre y licencia obligatorios.' });
    try {
        const [result] = await db.query('INSERT INTO choferes (nombre, licencia) VALUES (?, ?)', [nombre.trim(), licencia.trim()]);
        res.status(201).json({ id: result.insertId, nombre: nombre.trim(), licencia: licencia.trim() });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Esta licencia ya está registrada.' });
        res.status(500).json({ message: 'Error interno al crear chofer', error });
    }
});

// Actualizado con estatus
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, licencia, estatus } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE choferes SET nombre = ?, licencia = ?, estatus = ? WHERE id = ?',
            [nombre.trim(), licencia.trim(), estatus, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Chofer no encontrado' });
        res.json({ message: 'Chofer actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar chofer', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM choferes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Chofer eliminado correctamente' });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(409).json({ message: 'No se puede eliminar el chofer porque tiene viajes registrados.' });
        } else {
            res.status(500).json({ message: 'Error al eliminar chofer', error });
        }
    }
});

module.exports = router;