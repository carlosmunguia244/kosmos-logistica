-- Script de inicialización de Base de Datos
CREATE DATABASE IF NOT EXISTS kosmos_logistica;
USE kosmos_logistica;

-- Tabla de Choferes
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

-- Insertar un administrador por defecto
INSERT INTO administradores (usuario, password) 
VALUES ('admin_kosmos', 'kosmos2026');

-- Tabla de Vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    capacidad_kg DECIMAL(10,2) NOT NULL,
    estatus ENUM('Disponible', 'En Ruta', 'Mantenimiento') DEFAULT 'Disponible'
);

-- Tabla de Viajes (Aquí ocurre la relación)
CREATE TABLE IF NOT EXISTS viajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chofer_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fecha_salida DATETIME DEFAULT CURRENT_TIMESTAMP,
    estatus ENUM('Pendiente', 'En Curso', 'Completado', 'Cancelado') DEFAULT 'Pendiente',
    FOREIGN KEY (chofer_id) REFERENCES choferes(id) ON DELETE RESTRICT, 
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id) ON DELETE RESTRICT
);

ALTER TABLE vehiculos 
ADD COLUMN anio INT NOT NULL AFTER modelo;

-- Agregar estatus a choferes
ALTER TABLE choferes 
ADD COLUMN estatus ENUM('Activo', 'Inactivo', 'De vacaciones', 'Incapacitado', 'Suspendido', 'Disponible', 'En ruta') DEFAULT 'Activo';

-- Modificar estatus de vehículos
ALTER TABLE vehiculos 
MODIFY COLUMN estatus ENUM('Disponible', 'Asignado', 'En ruta', 'En mantenimiento preventivo', 'En mantenimiento correctivo', 'Fuera de servicio', 'En inspección') DEFAULT 'Disponible';

-- Modificar estatus de viajes y agregar columna de auditoría
ALTER TABLE viajes 
MODIFY COLUMN estatus ENUM('Programado', 'Pendiente de salida', 'En carga', 'En tránsito', 'En entrega', 'Completado', 'Cancelado', 'Retrasado') DEFAULT 'Programado',
ADD COLUMN asignado_por VARCHAR(50) NOT NULL DEFAULT 'Sistema';