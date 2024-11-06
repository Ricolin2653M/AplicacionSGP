// Importar modelos
import User from "../models/User.js";

// Importar controlador de token
import * as token from "../controllers/token.controller.js";

export const signUp = async (req, res) => {
    try {
        // Extraer datos de la petición
        const { name, lastname, email, password } = req.body;

        // Crear nuevo usuario con encriptación de contraseña
        const newUser = new User({
            name,
            lastname,
            email,
            password: await User.encryptPassword(password)
        });

        // Guardar el usuario en la base de datos
        const saveUser = await newUser.save();
        console.log(saveUser);

        // Responder con un mensaje de éxito
        res.json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const signIn = async (req, res) => {
    try {
        // Verificar si el correo existe en la base de datos
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound) {
            console.log("Error: usuario no encontrado");
            return res.status(400).json({ message: "Error: usuario no encontrado" });
        }

        // Verificar la contraseña
        const matchPassword = await User.comparePassword(req.body.password, userFound.password);
        if (!matchPassword) {
            console.log("Error: contraseña incorrecta");
            return res.status(401).json({ message: "Error: contraseña incorrecta" });
        }

        // Generar un token para el usuario encontrado
        const generatedToken = await token.signToken(userFound.id);

        // Responder con el token generado
        res.status(200).json({ token: generatedToken });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
