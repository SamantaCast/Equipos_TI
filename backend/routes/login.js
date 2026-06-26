const express = require("express");

const router = express.Router();

const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {

    const { usuario, password } = req.body;

    const user = await User.findOne({
      usuario,
      password,
    });

    if (!user) {
      return res.status(401).json({
        mensaje:
          "Usuario o contraseña incorrectos",
      });
    }

    res.json({
      mensaje:
        "Inicio de sesión exitoso",

      usuario: user.usuario,

      nombre: user.nombre,

      rol: user.rol,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error del servidor",
    });
  }
});

module.exports = router;