// Importa el framework Express.
const express = require("express");

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Importa el modelo de la colección de equipos.
const Equipo = require("../models/equipo");

// Importa el middleware que verifica el token de autenticación.
const verificarToken = require("../middleware/verificarToken");

/**
 * GET /
 * Obtiene todos los equipos registrados.
 * Requiere un token válido.
 */
router.get("/", verificarToken, async (req, res) => {

  try {

    // Consulta todos los documentos de la colección.
    const equipos = await Equipo.find();

    // Devuelve la lista de equipos en formato JSON.
    res.json(equipos);

  } catch (error) {

    // Muestra el error en la consola del servidor.
    console.error(error);

    // Responde con un error interno del servidor.
    res.status(500).json({
      mensaje: "Error al obtener equipos",
    });

  }

});


/**
 * POST /
 * Crea un nuevo registro de equipo.
 * Requiere un token válido.
 */
router.post("/", verificarToken, async (req, res) => {

  try {

    // Crea un nuevo documento con los datos recibidos.
    const nuevoEquipo = new Equipo(req.body);

    // Guarda el nuevo registro en la base de datos.
    await nuevoEquipo.save();

    // Devuelve el registro creado con código 201.
    res.status(201).json(nuevoEquipo);

  } catch (error) {

    // Muestra el error en la consola.
    console.error(error);

    // Responde con un error interno.
    res.status(500).json({
      mensaje: "Error al guardar",
    });

  }

});

/**
 * PUT /:id
 * Actualiza un equipo existente mediante su identificador.
 * Requiere un token válido.
 */
router.put("/:id", verificarToken, async (req, res) => {

  try {

    // Busca el registro por su ID y actualiza sus datos.
    const equipo = await Equipo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Devuelve el documento actualizado.
    res.json(equipo);

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Responde con un error interno.
    res.status(500).json({
      mensaje: "Error al actualizar",
    });

  }

});

/**
 * DELETE /:id
 * Elimina un equipo mediante su identificador.
 * Requiere un token válido.
 */
router.delete("/:id", verificarToken, async (req, res) => {

  try {

    // Elimina el documento correspondiente al ID recibido.
    await Equipo.findByIdAndDelete(
      req.params.id
    );

    // Confirma que el registro fue eliminado.
    res.json({
      mensaje: "Registro eliminado",
    });

  } catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Responde con un error interno.
    res.status(500).json({
      mensaje: "Error al eliminar",
    });

  }

});

// Exporta el enrutador para utilizarlo en la aplicación principal.
module.exports = router;