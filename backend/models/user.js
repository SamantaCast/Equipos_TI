const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    nombre: {
      type: String,
      required: true,
    },

    rol: {
      type: String,
      default: "admin",
    },
  },
  {
    collection: "user",
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);