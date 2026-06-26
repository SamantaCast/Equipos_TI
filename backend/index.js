require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");

const conectarDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
let db;

/* ==========================
   INICIAR SERVIDOR
========================== */

async function iniciarServidor() {

  try {

    db = await conectarDB();

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(
        `Servidor en http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "No se pudo iniciar el servidor:",
      error
    );

  }

}

iniciarServidor();





/* ==========================
   RUTA PRINCIPAL
========================== */

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

/* ==========================
   LOGIN
========================== */

app.post("/api/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const usuarioEncontrado = await db
      .collection("user")
      .findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(401).json({
        mensaje: "Usuario incorrecto",
      });
    }

    if (usuarioEncontrado.password !== password) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

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
    console.error(error);

    res.status(500).json({
      mensaje: "Error del servidor",
    });
  }
});

/* ==========================
   OBTENER EQUIPOS
========================== */

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

/* ==========================
   AGREGAR EQUIPO
========================== */
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

/* ==========================
   EDITAR EQUIPO
========================== */

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

/* ==========================
   ELIMINAR EQUIPO
========================== */

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

