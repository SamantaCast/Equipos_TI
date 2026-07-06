// Importa el framework Express para crear la aplicación web.
const express = require("express");

// Importa el middleware CORS para permitir solicitudes desde otros dominios.
const cors = require("cors");

// Importa la función encargada de establecer la conexión con MongoDB.
const conectarDB = require("./config/db");

// Importa las rutas relacionadas con el inicio de sesión.
const loginRoutes = require("./routes/login");

// Importa las rutas para la administración de equipos.
const equiposRoutes = require("./routes/equipos");

// Crea una instancia de la aplicación Express.
const app = express();

// Habilita CORS para aceptar peticiones desde el frontend.
app.use(cors());

// Permite que la aplicación reciba datos en formato JSON.
app.use(express.json());

// Establece la conexión con la base de datos.
conectarDB();

// Registra las rutas para el inicio de sesión.
app.use("/api", loginRoutes);

// Registra las rutas para la gestión de equipos.
app.use("/api/equipos", equiposRoutes);

// Exporta la aplicación para utilizarla desde otros archivos
// (por ejemplo, desde el archivo que inicia el servidor).
module.exports = app;