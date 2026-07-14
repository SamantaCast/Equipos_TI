// Importa la librería jsonwebtoken para verificar los tokens JWT.
const jwt = require("jsonwebtoken");

// Exporta un middleware que valida el token de autenticación.
module.exports = (req, res, next) => {

    // Obtiene el encabezado Authorization de la solicitud.
    const auth = req.headers.authorization;

    // Verifica si el encabezado existe.
    if (!auth) {

        return res.status(401).json({
            mensaje: "No autorizado"
        });

    }

    // Extrae el token.
    const token = auth.split(" ")[1];

    try {

        // Verifica el token.
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guarda la información del usuario para utilizarla en otras rutas.
        req.usuario = decoded;

        // Continúa con la siguiente función.
        next();

    } catch (error) {

        // El token expiró.
        if (error.name === "TokenExpiredError") {

            return res.status(401).json({
                mensaje: "La sesión ha expirado.",
                expirado: true
            });

        }

        // Token inválido.
        return res.status(401).json({
            mensaje: "Token inválido.",
            expirado: false
        });

    }

};