import Deposit from '../models/Deposit.js'
import TypeDeposit from '../models/TypeDeposit.js'
import mongoose from 'mongoose';


// Crear nuevo deposito
export const createDeposit = async (req, res) => {
    try {
        
        const { title, description, date, amount, type, idUser } = req.body;

        // Crear deposito
        const newDeposit = new Deposit({
            title, description, date, amount, type, idUser
        });

        // Guardar en bd
        const saveDeposit = await newDeposit.save();
        console.log(saveDeposit);

       
        res.json({ message: "depósito registrada exitosamente" });
    } catch (error) {
        console.error('Error al registrar depósito:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};



// Obtener todos los depositos por id de usuario
export const getDeposits = async (req, res) => {
    try {
        const { idUser } = req.params; // Obtener idUser desde los parámetros
        const deposits = await Deposit.find({ idUser }).populate('type', 'name'); 
        res.status(200).json(deposits);
    } catch (error) {
        console.error('Error al obtener depositos:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Actualizar un deposito id
export const updateDeposit = async (req, res) => {
    try {
        const { id, idUser } = req.params; // Obtener id y idUser desde los parámetros
        const updatedDeposit = await Deposit.findOneAndUpdate(
            { _id: id, idUser }, // Verifica que el deposito pertenece al usuario
            req.body,
            { new: true }
        );
        if (!updatedDeposit) return res.status(404).json({ message: 'depósito no encontrado o no pertenece al usuario' });
        res.status(200).json({
            message: 'Depósito actualizado correctamente',
            updatedDeposit
        });
    } catch (error) {
        console.error('Error al actualizar depósito:', error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un deposito específico
export const deleteDeposit = async (req, res) => {
    try {
        const { id, idUser } = req.params; // Obtener id y idUser desde los parámetros
        const deletedDeposit = await Deposit.findOneAndDelete({ _id: id, idUser }); // Verificar que el deposito ed del usuaiio
        if (!deletedDeposit) return res.status(404).json({ message: ' depósito no encontrado o no pertenece al usuario' });
        res.status(200).json({ message: 'depósito eliminado' });
    } catch (error) {
        console.error('Error al eliminar depósito:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};