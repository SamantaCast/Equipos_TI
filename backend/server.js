const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const loginRoutes = require("./routes/login");
const equiposRoutes = require("./routes/equipos");

const app = express();

app.use(cors());

app.use(express.json());

conectarDB();

app.use("/api", loginRoutes);

app.use("/api/equipos", equiposRoutes);

module.exports = app;