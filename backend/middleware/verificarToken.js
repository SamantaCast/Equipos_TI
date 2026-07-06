// Importa la librería jsonwebtoken para verificar los tokens JWT.
const jwt = require("jsonwebtoken");

// Exporta un middleware que valida el token de autenticación.
module.exports = (req, res, next) => {

    // Obtiene el encabezado Authorization de la solicitud.
    const auth = req.headers.authorization;

    // Verifica si el encabezado de autorización existe.
    if (!auth) {

        // Si no existe, responde con un error de acceso no autorizado.
        return res.status(401).json({
            mensaje: "No autorizado"
        });

    }

    // Extrae el token del formato: "Bearer <token>".
    const token = auth.split(" ")[1];

    try {

        // Verifica que el token sea válido utilizando la clave secreta.
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Si el token es válido, permite continuar con la siguiente función.
        next();

    } catch {

        // Si el token es inválido o expiró, responde con un error.
        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }

};