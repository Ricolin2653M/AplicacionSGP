// Importar modelos
import User from '../models/User.js';
import { verify_Token } from '../controllers/token.controller.js';

// Valida si el token es válido
export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: "No se ha proporcionado token" });

    try {
        // Extraer la información del token
        const decoded = await verify_Token(token);
        req.userId = decoded.id;

        // Buscar usuario en la base de datos
        const user = await User.findById(req.userId, { password: 0 });

        // Validar si el usuario existe
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Continuar con la siguiente acción si el usuario existe
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido", token: token });
    }
};
