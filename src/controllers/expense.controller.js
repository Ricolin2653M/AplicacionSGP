import Expense from '../models/Expense.js'
import TypeExpense from '../models/TypeExpense.js'
import mongoose from 'mongoose';


// Crear Gasto
export const createExpense = async (req, res) => {
    try {
        // Extraer datos de la petición
        const { title, description, date, amount, type, idUser } = req.body;

        // Crear nuevo usuario con encriptación de contraseña
        const newExpense = new Expense({
            title, description, date, amount, type, idUser
        });

        // Guardar el usuario en la base de datos
        const saveExpense = await newExpense.save();
        console.log(saveExpense);

        // Responder con un mensaje de éxito
        res.json({ message: "Expense registrada exitosamente" });
    } catch (error) {
        console.error('Error al registrar expense:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


/*
// Obtener todos los gastos del usuario autenticado
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ idUser: req.userId }).populate('type', 'name');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/
/*
// Actualizar un gasto específico
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, idUser: req.userId }, // Verificar que el gasto pertenece al usuario
            req.body,
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ message: 'Gasto no encontrado' });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};*/
/*
// Eliminar un gasto específico
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, idUser: req.userId });
        if (!deletedExpense) return res.status(404).json({ message: 'Gasto no encontrado' });
        res.status(200).json({ message: 'Gasto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/