# Descripción del proyecto

Sistema de administración integral diseñado para optimizar el control operativo de flotas vehiculares. La plataforma permite la gestión centralizada de choferes, parque vehicular y la programación de viajes, garantizando la trazabilidad operativa mediante una arquitectura robusta y segura.

Problema que resuelve:
El sistema resuelve la falta de control, la redundancia de datos y la descentralización operativa. Permite pasar de procesos manuales o desconectados a una plataforma única donde el administrador puede asignar recursos de manera eficiente, validar estados en tiempo real y auditar quién y cuándo se realizó cada movimiento logístico.

Alcance:
El proyecto abarca el ciclo de vida completo de la gestión de flota: desde el registro y control de estatus del personal y vehículos, hasta la generación de bitácoras de viajes con geolocalización integrada y la emisión de tickets de despacho para los operadores.

---

## Tecnologías

Entorno de Desarrollo (IDE): Visual Studio Code (VS Code), aprovechando su ecosistema de extensiones para la optimización del flujo de trabajo (incluyendo Database Client para la gestión de MySQL, Prettier para formato de código y Thunder Client para pruebas de API).

Entorno de Servidor Local: XAMPP, utilizado para la gestión del servidor MySQL y el control de la base de datos de manera local durante el desarrollo.

Entorno de Ejecución: Node.js con Express.js, proporcionando un servidor de alto rendimiento para la API RESTful.

Base de Datos: MySQL para la persistencia de datos relacionales, utilizando el driver mysql2 para gestionar consultas asíncronas de manera eficiente.

Frontend: Desarrollo web basado en estándares modernos (HTML5, CSS3, y JavaScript ES6+), utilizando una arquitectura de cliente ligero que consume la API mediante fetch.

Integración de Servicios: Consumo de la API de OpenStreetMap (Nominatim) para la geolocalización y sugerencia dinámica de direcciones.

Control de Versiones: Git para la gestión del historial de cambios y GitHub como plataforma de despliegue y colaboración.

---

## Pasos de Instalación

Guía de Configuración e Instalación
Para ejecutar este proyecto en un entorno local, sigue los pasos detallados a continuación:

A. Herramientas de Desarrollo Requeridas
Visual Studio Code (VS Code):

Instalación: Descárgalo desde code.visualstudio.com. Sigue el asistente de instalación estándar para tu sistema operativo.

Extensiones recomendadas:

Database Client: Úsala para conectarte a tu servidor MySQL sin salir del editor.

Prettier - Code formatter: Para mantener el estilo del código profesional y limpio.

Thunder Client: Útil para probar tus endpoints de API (GET, POST, etc.) antes de conectarlos al frontend.

XAMPP:

Instalación: Descárgalo desde apachefriends.org. Durante la instalación, asegúrate de marcar al menos Apache y MySQL.

Uso: Una vez instalado, abre el XAMPP Control Panel y haz clic en "Start" para los módulos de Apache y MySQL.

Node.js:

Instalación: Descarga la versión LTS (Long Term Support) desde nodejs.org. Esto instalará también npm (Node Package Manager).

B. Preparación del Proyecto
Clonar el repositorio:

git clone https://github.com/carlosmunguia244/kosmos-logistica.git
cd kosmos-logistica
Instalar dependencias del proyecto:
Abre la terminal integrada en VS Code (Ctrl + Ñ) y escribe:

npm install
Esto descargará express, mysql2 y dotenv automáticamente.

C. Configuración de Base de Datos
Abre el panel de control de XAMPP y presiona el botón "Admin" junto al módulo MySQL. Esto abrirá phpMyAdmin en tu navegador.

Crea una nueva base de datos llamada kosmos_logistica.

Selecciona la base de datos, ve a la pestaña "Importar", sube el archivo database/init.sql que se encuentra en la carpeta del repositorio y ejecuta la importación.

D. Variables de Entorno
Crea un archivo llamado .env en la raíz del proyecto y agrega tus configuraciones:

Fragmento de código
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=kosmos_logistica

Autor: Carlos Munguia - Prueba Técnica KOSMOS GPS