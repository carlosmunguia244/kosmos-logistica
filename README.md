# Módulo de Despacho Logístico (KOSMOS GPS)

## Descripción
Proyecto de gestión logística desarrollado para la evaluación técnica de KOSMOS GPS. Permite la administración de choferes, vehículos y registro de viajes.

## Tecnologías Utilizadas
- **Backend:** Node.js, Express.js
- **Base de Datos:** MySQL
- **Frontend:** HTML5, CSS3, JavaScript
- **Control de Versiones:** Git / GitHub

## Entorno de Desarrollo
Para ejecutar este proyecto, necesitas:
1. Node.js (versión LTS).
2. XAMPP (para el servidor MySQL).
3. Visual Studio Code con la extensión "Database Client", "Thunder Client".

## Configuración
1. Clona este repositorio.
2. Ejecuta `npm install` en la terminal para instalar las dependencias.
3. Configura las variables de entorno en el archivo `.env` (puerto, host, usuario, password, base de datos).
4. Ejecuta el script SQL `database/init.sql` desde tu gestor de base de datos para crear las tablas.
5. Ejecuta `npm run dev` para iniciar el servidor.

## Pruebas de API
Utiliza **Thunder Client** en Visual Studio Code para validar el CRUD:
- **GET** `/api/choferes`: Listar todos los registros.
- **POST** `/api/choferes`: Crear un nuevo chofer (JSON).
- **PUT** `/api/choferes/:id`: Actualizar registro existente.
- **DELETE** `/api/choferes/:id`: Eliminar registro por ID.