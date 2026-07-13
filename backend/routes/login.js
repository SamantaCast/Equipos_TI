// Importa Express.
const express = require("express");

// Crea el router.
const router = express.Router();

// Modelo de usuarios.
const User = require("../models/user");

// JWT.
const jwt = require("jsonwebtoken");

/**
 * POST /api/login
 */
router.post("/login", async (req, res) => {

  try {

    const { usuario, password } = req.body;

    const user = await User.findOne({
      usuario,
      password,
    });

    if (!user) {

      return res.status(401).json({
        mensaje: "Usuario o contraseña incorrectos",
      });

    }

    // Genera el token
    const token = jwt.sign(

      {

        id: user._id,
        usuario: user.usuario,
        rol: user.rol,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "8h",

      }

    );

    // Devuelve el token y los datos del usuario
    res.json({

      mensaje: "Login exitoso",

      token,

      usuario: {

        id: user._id,
        nombre: user.nombre,
        usuario: user.usuario,
        genero: user.genero,
        rol: user.rol,

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      mensaje: "Error del servidor",

    });

  }

});

module.exports = router;