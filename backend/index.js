// Carga las variables de entorno definidas en el archivo .env.
require("dotenv").config();

// Importa el framework Express.
const express = require("express");

// Importa el middleware CORS para permitir solicitudes desde otros dominios.
const cors = require("cors");

// Importa ObjectId para trabajar con identificadores de MongoDB.
const { ObjectId } = require("mongodb");

// Importa la función encargada de establecer la conexión con la base de datos.
const conectarDB = require("./config/db");

// Crea la aplicación de Express.
const app = express();

// Habilita CORS para permitir peticiones desde el frontend.
app.use(cors());

// Permite recibir datos en formato JSON.
app.use(express.json());

// Variable que almacenará la conexión a la base de datos.
let db;


/*INICIAR SERVIDOR */

/**
 * Establece la conexión con MongoDB e inicia el servidor.
 */
async function iniciarServidor() {

  try {

    // Conecta con la base de datos.
    db = await conectarDB();

    // Obtiene el puerto desde las variables de entorno
    // o utiliza el puerto 5000 por defecto.
    const PORT =
      process.env.PORT || 5000;

    // Inicia el servidor y lo deja escuchando conexiones.
    app.listen(PORT, "0.0.0.0", () => {

      // Muestra un mensaje cuando el servidor inicia correctamente.
      console.log(`Servidor iniciado en el puerto ${PORT}`);

    });

  } catch (error) {

    // Muestra un mensaje si ocurre un error al iniciar el servidor.
    console.error(
      "No se pudo iniciar el servidor:",
      error
    );

  }

}

// Ejecuta la función que inicia el servidor.
iniciarServidor();



/* RUTA PRINCIPAL */

/**
 * GET /
 * Verifica que el backend esté funcionando correctamente.
 */
app.get("/", (req, res) => {

  res.send("Backend funcionando");

});


/* LOGIN */

/**
 * POST /api/login
 * Valida las credenciales del usuario.
 */
app.post("/api/login", async (req, res) => {

  try {

    // Muestra el cuerpo recibido para depuración.
    console.log("Body recibido:", req.body);

    // Obtiene el usuario y la contraseña enviados.
    const { usuario, password } = req.body;

    console.log("Usuario:", usuario);

    // Obtiene todos los usuarios registrados.
    const usuarios = await db.collection("user").find().toArray();

    console.log("Usuarios:", usuarios);

    // Busca el usuario por su nombre de usuario.
    const usuarioEncontrado = await db
      .collection("user")
      .findOne({ usuario });

    console.log("Resultado:", usuarioEncontrado);

    // Verifica que el usuario exista.
    if (!usuarioEncontrado) {

      return res.status(401).json({
        mensaje: "Usuario incorrecto",
      });

    }

    // Verifica que la contraseña coincida.
    if (usuarioEncontrado.password !== password) {

      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });

    }

    // Devuelve la información del usuario autenticado.
    res.json({

      mensaje: "Login exitoso",

      usuario: {
        id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre,
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol,
      },

    });

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Responde con un error interno del servidor.
    res.status(500).json({
      mensaje: "Error del servidor",
    });

  }

});


/* OBTENER EQUIPOS */

/**
 * GET /api/equipos
 * Obtiene todos los registros de equipos.
 */
app.get("/api/equipos", async (req, res) => {

  try {

    // Consulta todos los documentos de la colección "datos".
    const equipos = await db
      .collection("datos")
      .find({})
      .toArray();

    // Devuelve los registros encontrados.
    res.json(equipos);

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Devuelve un error del servidor.
    res.status(500).json(error);

  }

});


/* AGREGAR EQUIPO */

/**
 * POST /api/equipos
 * Agrega un nuevo equipo a la base de datos.
 */
app.post("/api/equipos", async (req, res) => {

  try {

    // Inicia un temporizador para medir el tiempo de inserción.
    console.time("INSERTAR");

    // Obtiene los datos enviados desde el cliente.
    const nuevoEquipo = req.body;

    // Inserta el nuevo documento en la colección.
    const resultado = await db
      .collection("datos")
      .insertOne(nuevoEquipo);

    // Finaliza el temporizador.
    console.timeEnd("INSERTAR");

    // Devuelve el identificador del registro creado.
    res.status(201).json({
      insertedId: resultado.insertedId,
    });

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Devuelve un error del servidor.
    res.status(500).json(error);

  }

});


/* EDITAR EQUIPO */

/**
 * PUT /api/equipos/:id
 * Actualiza un equipo utilizando su identificador.
 */
app.put("/api/equipos/:id", async (req, res) => {

  try {

    // Obtiene el ID enviado en la URL.
    const { id } = req.params;

    // Obtiene los nuevos datos del equipo.
    const datosActualizados = req.body;

    // Actualiza el documento correspondiente.
    await db.collection("datos").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: datosActualizados,
      }
    );

    // Confirma la actualización.
    res.json({
      mensaje: "Registro actualizado",
    });

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Devuelve un error del servidor.
    res.status(500).json(error);

  }

});


/* ELIMINAR EQUIPO */

/**
 * DELETE /api/equipos/:id
 * Elimina un equipo mediante su identificador.
 */
app.delete("/api/equipos/:id", async (req, res) => {

  try {

    // Obtiene el ID enviado en la URL.
    const { id } = req.params;

    // Elimina el documento correspondiente.
    await db.collection("datos").deleteOne({
      _id: new ObjectId(id),
    });

    // Confirma la eliminación.
    res.json({
      mensaje: "Registro eliminado",
    });

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Devuelve un error del servidor.
    res.status(500).json(error);

  }

});