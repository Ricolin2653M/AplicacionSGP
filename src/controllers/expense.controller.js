import Expense from '../models/Expense.js'
import TypeExpense from '../models/TypeExpense.js'
import mongoose from 'mongoose';

// Crear Gasto
export const createExpense = async (req, res) => {
    try {
        // Extraer datos de la petición
        const { title, description, date, amount, type, idUser } = req.body;

        // Crear nuevo gasto
        const newExpense = new Expense({
            title, description, date, amount, type, idUser
        });

        // Guardar el gasto en la base de datos
        const saveExpense = await newExpense.save();
        console.log(saveExpense);

        // Responder con un mensaje de éxito
        res.json({ message: "Expense registrada exitosamente" });
    } catch (error) {
        console.error('Error al registrar expense:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Obtener todos los gastos de un usuario específico
export const getExpenses = async (req, res) => {
    try {
        const { idUser } = req.params; // Obtener idUser desde los parámetros
        const expenses = await Expense.find({ idUser }).populate('type', 'name'); // Filtrar por idUser
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error al obtener gastos:', error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Actualizar un gasto específico
export const updateExpense = async (req, res) => {
    try {
        const { id, idUser } = req.params; // Obtener id y idUser desde los parámetros
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, idUser }, // Verificar que el gasto pertenece al usuario
            req.body,
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ message: 'Gasto no encontrado o no pertenece al usuario' });
        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error('Error al actualizar gasto:', error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un gasto específico
export const deleteExpense = async (req, res) => {
    try {
        const { id, idUser } = req.params; // Obtener id y idUser desde los parámetros
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, idUser }); // Verificar que el gasto pertenece al usuario
        if (!deletedExpense) return res.status(404).json({ message: 'Gasto no encontrado o no pertenece al usuario' });
        res.status(200).json({ message: 'Gasto eliminado' });
    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
