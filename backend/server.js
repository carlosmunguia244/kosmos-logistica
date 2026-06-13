/* Servidor principal: Configuración de API y rutas de servicios */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de diagnóstico para verificar estado de conexión a BD
app.get('/api/status', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ status: 'success', message: 'Conectado a la base de datos' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error de conexión' });
    }
});

// Importación y uso de rutas de choferes
app.use('/api/choferes', require('./routes/choferes'));

// Servir archivos estáticos del frontend
app.use(express.static('frontend'));

// Definición del puerto: usa la variable de entorno o cae por defecto al 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});