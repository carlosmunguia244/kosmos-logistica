/* Módulo de conexión a base de datos MySQL mediante pool  */
const mysql = require('mysql2');
require('dotenv').config();

// Pool para gestión eficiente de múltiples conexiones concurrentes
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10, // Límite de conexiones simultáneas
    queueLimit: 0
});

// Convertimos el pool a promesas para usar async/await de forma limpia
const promisePool = pool.promise();

module.exports = promisePool;