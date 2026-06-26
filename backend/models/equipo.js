const mongoose = require("mongoose");

const equipoSchema = new mongoose.Schema(
  {},
  {
    collection: "datos",
    strict: false,
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "Equipo",
  equipoSchema
);