-- Script de inicialización de Base de Datos
CREATE DATABASE IF NOT EXISTS kosmos_logistica;
USE kosmos_logistica;

-- Tabla de ejemplo (Choferes)
CREATE TABLE IF NOT EXISTS choferes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    licencia VARCHAR(50) NOT NULL
);

-- Tabla para Administradores
CREATE TABLE IF NOT EXISTS administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- En un proyecto real esto iría encriptado (ej. bcrypt)
);

-- Insertar un administrador por defecto para poder probar
INSERT INTO administradores (usuario, password) 
VALUES ('admin_kosmos', 'kosmos2026');