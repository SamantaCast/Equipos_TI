// Importa la clase MongoClient desde el paquete oficial de MongoDB.
const { MongoClient } = require("mongodb");

// Obtiene la cadena de conexión desde la variable de entorno MONGO_URI.
const uri = process.env.MONGODB_URI;

/**
 * Función asíncrona encargada de establecer la conexión
 * con la base de datos MongoDB.
 *
 * @returns {Promise<Db>} Devuelve la instancia de la base de datos.
 */
async function conectarDB() {

  try {

    // Crea una nueva instancia del cliente de MongoDB utilizando la URI.
    const cliente = new MongoClient(uri);

    // Establece la conexión con el servidor de MongoDB.
    await cliente.connect();

    // Muestra un mensaje en consola cuando la conexión es exitosa.
    console.log("MongoDB conectado");

    // Retorna la base de datos que será utilizada por la aplicación.
    return cliente.db("equipos_ti");

  } catch (error) {

    // Muestra el error en caso de que falle la conexión.
    console.error(
      "Error al conectar a MongoDB:",
      error
    );

    // Finaliza la ejecución de la aplicación con código de error.
    process.exit(1);

  }

}

// Exporta la función para que pueda ser utilizada en otros archivos del proyecto.
module.exports = conectarDB;