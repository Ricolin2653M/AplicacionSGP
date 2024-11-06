import User from '../models/User.js';
import mongoose from 'mongoose';
import * as token from "../controllers/token.controller.js";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'El ID no corresponde a ningún usuario' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;
        const newUser = new User({
            name,
            lastname,
            email,
            password: await User.encryptPassword(password)  // Encriptación de la contraseña
        });

        const saveUser = await newUser.save();

        const generatedToken = await token.signToken(saveUser.id);  // Generar token para el usuario creado

        res.status(201).json({ user: saveUser, token: generatedToken });  // Responder con el usuario creado y el token
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar un usuario por su ID
export const updateUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        // Buscar el usuario por ID
        let userToUpdate = await User.findById(req.params.userId);

        // Si no se encuentra el usuario, retornar error
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar campos del usuario si se proporcionan
        if (name) userToUpdate.name = name;
        if (lastname) userToUpdate.lastname = lastname;
        if (email) userToUpdate.email = email;
        if (password) userToUpdate.password = await User.encryptPassword(password);  // Encriptación de la contraseña si se actualiza

        // Guardar los cambios en el usuario
        const updatedUser = await userToUpdate.save();

        res.json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
