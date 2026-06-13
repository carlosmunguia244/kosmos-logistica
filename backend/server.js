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

// Importación y uso de rutas modulares
app.use('/api/choferes', require('./routes/choferes'));
app.use('/api/auth', require('./routes/auth'));

// Servir archivos estáticos de la carpeta frontend
app.use(express.static('frontend'));

// Redirigir la ruta raíz '/' automáticamente a la pantalla de login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Definición del puerto: usa la variable de entorno o cae por defecto al 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});