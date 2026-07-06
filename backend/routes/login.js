// Importa el framework Express.
const express = require("express");

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Importa el modelo de usuarios.
const User = require("../models/user");

// Importa la librería para generar y verificar tokens JWT.
const jwt = require("jsonwebtoken");


/**
 * POST /login
 * Autentica a un usuario y genera un token JWT.
 */
router.post("/login", async (req, res) => {

  try {

    // Obtiene el usuario y la contraseña enviados desde el cliente.
    const { usuario, password } = req.body;

    // Busca un usuario que coincida con las credenciales proporcionadas.
    const user = await User.findOne({
      usuario,
      password,
    });

    // Verifica si el usuario existe.
    if (!user) {

      // Si las credenciales son incorrectas, responde con un error.
      return res.status(401).json({
        mensaje:
          "Usuario o contraseña incorrectos",
      });

    }

    // Genera un token JWT con la información del usuario.
    const token = jwt.sign(
      {
        id: user._id,
        usuario: user.usuario,
        rol: user.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h"
      }
    );

    // Devuelve el token y la información del usuario autenticado.
    res.json({

      mensaje: "Inicio de sesión exitoso",

      token,

      usuario: {
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol
      }

    });

  } catch (error) {

    // Muestra el error en la consola del servidor.
    console.error(error);

    // Responde con un error interno del servidor.
    res.status(500).json({
      mensaje: "Error del servidor",
    });

  }

});

// Exporta el enrutador para utilizarlo en la aplicación principal.
module.exports = router;