import Deposit from '../models/Deposit.js';
import TypeDeposit from '../models/TypeDeposit.js';
import mongoose from 'mongoose';

// Crear nuevo depósito
export const createDeposit = async (req, res) => {
    try {
        const { title, description, date, amount, type, idUser } = req.body;

        // Crear depósito
        const newDeposit = new Deposit({
            title,
            description,
            date,
            amount,
            type,
            idUser,
        });

        // Guardar en la base de datos
        const saveDeposit = await newDeposit.save();
        console.log(saveDeposit);

        res.json({ message: 'Depósito registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar depósito:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todos los depósitos por ID de usuario y formatear el campo 'type'
export const getDeposits = async (req, res) => {
    try {
        const { idUser } = req.params; // Obtener idUser desde los parámetros

        // Buscar los depósitos del usuario y poblar el campo 'type' con solo el nombre
        const deposits = await Deposit.find({ idUser }).populate('type', 'name');

        // Formatear los depósitos para incluir solo el nombre del tipo de depósito
        const formattedDeposits = deposits.map(deposit => ({
            ...deposit.toObject(),
            type: Array.isArray(deposit.type) 
                ? deposit.type.map(t => t.name) // Si es un array, mapear los nombres
                : deposit.type.name // Si no es un array, tomar el nombre directamente
        }));

        res.status(200).json(formattedDeposits);
    } catch (error) {
        console.error('Error al obtener depósitos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar un depósito por ID
export const updateDeposit = async (req, res) => {
    try {
        const { id, idUser } = req.params; // Obtener id y idUser desde los parámetros
        const updatedDeposit = await Deposit.findOneAndUpdate(
            { _id: id, idUser }, // Verifica que el depósito pertenece al usuario
            req.body,
            { new: true } // Retorna el documento actualizado
        );

        if (!updatedDeposit) {
            return res.status(404).json({ message: 'Depósito no encontrado o no pertenece al usuario' });
        }

        res.status(200).json({
            message: 'Depósito actualizado correctamente',
            updatedDeposit,
        });
    } catch (error) {
        console.error('Error al actualizar depósito:', error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un depósito específico
export const deleteDeposit = async (req, res) => {
    try {
        const { id, idUser } = req.params; // Obtener id y idUser desde los parámetros
        const deletedDeposit = await Deposit.findOneAndDelete({ _id: id, idUser }); // Verificar que el depósito pertenece al usuario

        if (!deletedDeposit) {
            return res.status(404).json({ message: 'Depósito no encontrado o no pertenece al usuario' });
        }

        res.status(200).json({ message: 'Depósito eliminado' });
    } catch (error) {
        console.error('Error al eliminar depósito:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};