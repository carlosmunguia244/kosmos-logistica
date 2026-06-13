const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta: Login para Administradores
router.post('/admin', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM administradores WHERE usuario = ? AND password = ?', [usuario, password]);
        
        if (rows.length > 0) {
            res.json({ message: 'Login exitoso', rol: 'admin', usuario: rows[0].usuario });
        } else {
            res.status(401).json({ message: 'Credenciales de administrador incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});

// Ruta: Login para Choferes
router.post('/chofer', async (req, res) => {
    const { licencia } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM choferes WHERE licencia = ?', [licencia]);
        
        if (rows.length > 0) {
            res.json({ message: 'Bienvenido chofer', rol: 'chofer', datos: rows[0] });
        } else {
            res.status(401).json({ message: 'Licencia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});

module.exports = router;