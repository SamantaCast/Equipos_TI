const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

async function conectarDB() {

  try {

    const cliente = new MongoClient(uri);

    await cliente.connect();

    console.log("MongoDB conectado");

    return cliente.db("equipos_ti");

  } catch (error) {

    console.error(
      "Error al conectar a MongoDB:",
      error
    );

    process.exit(1);

  }

}

module.exports = conectarDB;