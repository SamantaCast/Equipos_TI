const express = require("express");

const router = express.Router();

const Equipo = require("../models/equipo");

router.get("/", async (req, res) => {
  try {
    const equipos = await Equipo.find();

    res.json(equipos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener equipos",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoEquipo = new Equipo(req.body);

    await nuevoEquipo.save();

    res.status(201).json(nuevoEquipo);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al guardar",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(equipo);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Equipo.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Registro eliminado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar",
    });
  }
});

module.exports = router;