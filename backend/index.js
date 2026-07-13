// Carga las variables de entorno definidas en el archivo .env.
require("dotenv").config();

// Importa el framework Express.
const express = require("express");

// Importa el middleware CORS para permitir solicitudes desde otros dominios.
const cors = require("cors");

// Importa ObjectId para trabajar con identificadores de MongoDB.
const { ObjectId } = require("mongodb");

// Importa JWT.
const jwt = require("jsonwebtoken");

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

/* INICIAR SERVIDOR */

/**
 * Establece la conexión con MongoDB e inicia el servidor.
 */
async function iniciarServidor() {

  try {

    // Conecta con la base de datos.
    db = await conectarDB();

    // Obtiene el puerto desde las variables de entorno
    // o utiliza el puerto 5000 por defecto.
    const PORT = process.env.PORT || 5000;

    // Inicia el servidor.
    app.listen(PORT, "0.0.0.0", () => {

      console.log(`Servidor iniciado en el puerto ${PORT}`);

    });

  } catch (error) {

    console.error(
      "No se pudo iniciar el servidor:",
      error
    );

  }

}

// Ejecuta el servidor.
iniciarServidor();

/* RUTA PRINCIPAL */

/**
 * GET /
 * Verifica que el backend esté funcionando.
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

    const { usuario, password } = req.body;

    console.log("Usuario:", usuario);

    // Busca el usuario.
    const usuarioEncontrado = await db
      .collection("user")
      .findOne({ usuario });

    // Verifica que exista.
    if (!usuarioEncontrado) {

      return res.status(401).json({

        mensaje: "Usuario incorrecto",

      });

    }

    // Verifica la contraseña.
    if (usuarioEncontrado.password !== password) {

      return res.status(401).json({

        mensaje: "Contraseña incorrecta",

      });

    }

    // Genera el token JWT.
    const token = jwt.sign(

      {

        id: usuarioEncontrado._id,
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "8h",

      }

    );

    console.log(
      "Login correcto:",
      usuarioEncontrado.usuario
    );

    // Devuelve la información del usuario.
    res.json({

      mensaje: "Login exitoso",

      token,

      usuario: {

        id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre,
        usuario: usuarioEncontrado.usuario,
        genero: usuarioEncontrado.genero,
        rol: usuarioEncontrado.rol,

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      mensaje: "Error del servidor",

    });

  }

});

/* OBTENER EQUIPOS */

/**
 * GET /api/equipos
 * Obtiene todos los registros.
 */
app.get("/api/equipos", async (req, res) => {

  try {

    const equipos = await db
      .collection("datos")
      .find({})
      .toArray();

    res.json(equipos);

  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});

/* AGREGAR EQUIPO */

/**
 * POST /api/equipos
 * Agrega un nuevo equipo.
 */
app.post("/api/equipos", async (req, res) => {

  try {

    console.time("INSERTAR");

    const nuevoEquipo = req.body;

    const resultado = await db
      .collection("datos")
      .insertOne(nuevoEquipo);

    console.timeEnd("INSERTAR");

    res.status(201).json({

      insertedId: resultado.insertedId,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});

/* EDITAR EQUIPO */

/**
 * PUT /api/equipos/:id
 * Actualiza un registro.
 */
app.put("/api/equipos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const datosActualizados = req.body;

    await db.collection("datos").updateOne(

      {

        _id: new ObjectId(id),

      },

      {

        $set: datosActualizados,

      }

    );

    res.json({

      mensaje: "Registro actualizado",

    });

  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});

/* ELIMINAR EQUIPO */

/**
 * DELETE /api/equipos/:id
 * Elimina un registro.
 */
app.delete("/api/equipos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.collection("datos").deleteOne({

      _id: new ObjectId(id),

    });

    res.json({

      mensaje: "Registro eliminado",

    });

  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});