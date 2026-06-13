const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Listar todos los viajes (Administrador)
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                viajes.id, 
                viajes.chofer_id,
                viajes.vehiculo_id,
                choferes.nombre AS chofer, 
                vehiculos.placa AS vehiculo, 
                viajes.origen, 
                viajes.destino, 
                viajes.fecha_salida,
                viajes.estatus,
                viajes.asignado_por
            FROM viajes
            JOIN choferes ON viajes.chofer_id = choferes.id
            JOIN vehiculos ON viajes.vehiculo_id = vehiculos.id
            ORDER BY viajes.fecha_salida DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener viajes', error });
    }
});

// NUEVA RUTA: Listar viajes de un chofer específico
router.get('/chofer/:id', async (req, res) => {
    try {
        const query = `
            SELECT viajes.*, vehiculos.placa, vehiculos.modelo 
            FROM viajes 
            JOIN vehiculos ON viajes.vehiculo_id = vehiculos.id 
            WHERE viajes.chofer_id = ? 
            ORDER BY viajes.fecha_salida DESC
        `;
        const [rows] = await db.query(query, [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener viajes del chofer', error });
    }
});

// Registrar un nuevo viaje
router.post('/', async (req, res) => {
    const { chofer_id, vehiculo_id, origen, destino, asignado_por } = req.body;
    if (!chofer_id || !vehiculo_id || !origen || !destino) {
        return res.status(400).json({ message: 'Faltan datos para registrar el viaje' });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO viajes (chofer_id, vehiculo_id, origen, destino, asignado_por) VALUES (?, ?, ?, ?, ?)',
            [chofer_id, vehiculo_id, origen.trim(), destino.trim(), asignado_por || 'Sistema']
        );
        res.status(201).json({ message: 'Viaje registrado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear viaje', error });
    }
});

// Actualizar un viaje existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { chofer_id, vehiculo_id, origen, destino, estatus } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE viajes SET chofer_id = ?, vehiculo_id = ?, origen = ?, destino = ?, estatus = ? WHERE id = ?',
            [chofer_id, vehiculo_id, origen.trim(), destino.trim(), estatus, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Viaje no encontrado' });
        res.json({ message: 'Viaje actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar viaje', error });
    }
});

// Eliminar un viaje
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM viajes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Viaje eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar viaje', error });
    }
});

module.exports = router;