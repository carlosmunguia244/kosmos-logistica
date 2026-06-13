-- ========================================================
-- SCRIPT DE INICIALIZACIÓN: KOSMOS LOGÍSTICA
-- ========================================================

CREATE DATABASE IF NOT EXISTS kosmos_logistica;
USE kosmos_logistica;

-- 1. Tabla Administradores
CREATE TABLE IF NOT EXISTS administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insertar administrador inicial solo si no existe
INSERT IGNORE INTO administradores (usuario, password) 
VALUES ('admin_kosmos', 'kosmos2026');

-- 2. Tabla Choferes
CREATE TABLE IF NOT EXISTS choferes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    licencia VARCHAR(50) NOT NULL UNIQUE,
    estatus ENUM('Activo', 'Inactivo', 'De vacaciones', 'Incapacitado', 'Suspendido', 'Disponible', 'En ruta') DEFAULT 'Activo'
);

-- 3. Tabla Vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    capacidad_kg DECIMAL(10,2) NOT NULL,
    estatus ENUM('Disponible', 'Asignado', 'En ruta', 'En mantenimiento preventivo', 'En mantenimiento correctivo', 'Fuera de servicio', 'En inspección') DEFAULT 'Disponible'
);

-- 4. Tabla Viajes (Relacional)
CREATE TABLE IF NOT EXISTS viajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chofer_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fecha_salida DATETIME DEFAULT CURRENT_TIMESTAMP,
    estatus ENUM('Programado', 'Pendiente de salida', 'En carga', 'En tránsito', 'En entrega', 'Completado', 'Cancelado', 'Retrasado') DEFAULT 'Programado',
    asignado_por VARCHAR(50) NOT NULL DEFAULT 'Sistema',
    
    FOREIGN KEY (chofer_id) REFERENCES choferes(id) ON DELETE RESTRICT, 
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id) ON DELETE RESTRICT
);