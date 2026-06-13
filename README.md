# KOSMOS GPS - Gestión Logística

Aplicación web Full Stack para el control operativo de choferes. Desarrollada como prueba técnica, demuestra habilidades en la creación de APIs REST, gestión de bases de datos relacionales y seguridad básica.

---

## Tecnologías

* **Backend:** Node.js, Express.js.
* **Base de Datos:** MySQL (Driver `mysql2` con Promesas).
* **Frontend:** HTML5, JavaScript (Vanilla ES6), API Fetch.
* **Arquitectura:** Cliente-Servidor (SPA consumiendo API REST).

---

## Características Principales

* **Sistema de Roles:** Acceso independiente y rutas protegidas para Administradores y Operadores (Choferes).
* **Gestión de Entidades (CRUD Completo):**
  * **Choferes:** Alta, edición y control de estatus (Activo, En ruta, Vacaciones, etc.).
  * **Vehículos:** Control de flota, capacidades de carga, año y estado físico.
  * **Viajes:** Motor relacional (JOINs) que vincula al chofer, el vehículo y el administrador responsable.
* **Portal del Chofer:** Vista personalizada donde el operador consulta sus credenciales y su bitácora de viajes asignados en tiempo real.
* **Integración de Mapas:** Autocompletado de direcciones de origen y destino consumiendo la API de OpenStreetMap.
* **Impresión y Reportes:** Generación automática de tickets de despacho en formato de recibo para los viajes programados.
* **Auditoría:** Registro automático del usuario que asigna cada viaje y fechas exactas de salida.

---

## Instalación y Uso

1. Clonar e Instalar
bash
git clone [https://github.com/carlosmunguia244/kosmos-logistica.git](https://github.com/carlosmunguia244/kosmos-logistica.git)
cd kosmos-logistica
npm install

2. Configurar Entorno
Crea un archivo .env en la raíz del proyecto:

Fragmento de código
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=kosmos_logistica

3. Base de Datos
Ejecuta el script database/init.sql en tu gestor MySQL para crear las tablas relacionales y el usuario administrador de prueba (admin_kosmos / kosmos2026).

4. Ejecutar

Bash
npm run dev
La aplicación estará disponible en http://localhost:3000.

Endpoints de la API
Autenticación

POST /api/auth/admin - Valida credenciales del administrador.

POST /api/auth/chofer - Valida acceso del chofer vía licencia.

Módulo de Choferes

GET, POST, PUT, DELETE en /api/choferes

Módulo de Vehículos

GET, POST, PUT, DELETE en /api/vehiculos

Módulo de Viajes (Despacho)

GET /api/viajes - Obtiene bitácora completa cruzando datos con JOINs.

POST, PUT, DELETE en /api/viajes - Gestión de rutas y actualización de estatus.

GET /api/viajes/chofer/:id - Obtiene el historial específico de un chofer.

Seguridad y Buenas Prácticas
Integridad Relacional: Uso de Restricciones de Llave Foránea (ON DELETE RESTRICT) para evitar inconsistencias (ej. borrar un chofer que tiene un viaje en curso).

Prevención SQL Injection: Uso estricto de consultas parametrizadas (?) en todas las interacciones con la base de datos.

Validación de Datos: El backend rechaza peticiones incompletas (Código HTTP 400).

Pool de Conexiones: Gestión eficiente de peticiones concurrentes a MySQL sin saturar el servidor.

Optimización de APIs Externas: Implementación de temporizadores (setTimeout) en el frontend para evitar la saturación de llamadas a la API de mapas.

Variables de Entorno: Aislamiento de credenciales mediante .env (excluido en .gitignore).

Autor: Carlos Munguia - Prueba Técnica KOSMOS GPS