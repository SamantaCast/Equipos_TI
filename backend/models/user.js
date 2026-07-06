// Importa la librería Mongoose para definir esquemas y modelos de MongoDB.
const mongoose = require("mongoose");

// Define el esquema que utilizará la colección de usuarios.
const userSchema = new mongoose.Schema(
  {

    // Nombre de usuario utilizado para iniciar sesión.
    usuario: {
      type: String,
      required: true,
    },

    // Contraseña del usuario.
    password: {
      type: String,
      required: true,
    },

    // Nombre completo del usuario.
    nombre: {
      type: String,
      required: true,
    },

    // Rol asignado al usuario.
    // Si no se especifica, se asigna "admin" por defecto.
    rol: {
      type: String,
      default: "admin",
    },

  },
  {
    // Nombre de la colección en MongoDB.
    collection: "user",

    // Evita que Mongoose agregue el campo __v.
    versionKey: false,
  }
);

// Exporta el modelo "User" para utilizarlo en otras partes de la aplicación.
module.exports = mongoose.model(
  "User",
  userSchema
);