// Importa la librería Mongoose para trabajar con MongoDB mediante modelos.
const mongoose = require("mongoose");

// Define el esquema del modelo Equipo.
const equipoSchema = new mongoose.Schema(

  // Se deja vacío porque los campos serán dinámicos.
  {},
  {
    // Especifica el nombre de la colección en MongoDB.
    collection: "datos",

    // Permite almacenar documentos con cualquier estructura.
    strict: false,

    // Evita que Mongoose agregue el campo __v de control de versiones.
    versionKey: false,
  }
);

// Exporta el modelo "Equipo" basado en el esquema definido.
module.exports = mongoose.model(
  "Equipo",
  equipoSchema
);