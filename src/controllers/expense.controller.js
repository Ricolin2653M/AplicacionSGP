import Expense from '../models/Expense.js';
import TypeExpense from '../models/TypeExpense.js';
import mongoose from 'mongoose';

// Crear Gasto
export const createExpense = async (req, res) => {
    try {
        const { title, description, date, amount, type, idUser } = req.body;

        // Crear nuevo gasto
        const newExpense = new Expense({
            title,
            description,
            date,
            amount,
            type,
            idUser,
        });

        // Guardar el gasto en la base de datos
        const saveExpense = await newExpense.save();
        console.log(saveExpense);

        res.json({ message: 'Expense registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar expense:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todos los gastos por ID de usuario y formatear el campo 'type'
export const getExpenses = async (req, res) => {
    try {
        const { idUser } = req.params;

        // Buscar los gastos del usuario y poblar el campo 'type' con solo el nombre
        const expenses = await Expense.find({ idUser }).populate('type', 'name');

        // Formatear los gastos para incluir solo el nombre del tipo de gasto
        const formattedExpenses = expenses.map(expense => ({
            ...expense.toObject(),
            type: Array.isArray(expense.type)
                ? expense.type.map(t => t.name) // Si es un array, mapear los nombres
                : expense.type?.name || 'No Type', // Si no es un array, tomar el nombre o asignar un valor por defecto
        }));

        res.status(200).json(formattedExpenses);
    } catch (error) {
        console.error('Error al obtener gastos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar un gasto específico por ID
export const updateExpense = async (req, res) => {
    try {
        const { id, idUser } = req.params;

        // Actualizar el gasto
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, idUser },
            req.body,
            { new: true }
        ).populate('type', 'name'); // Poblar el tipo actualizado con su nombre

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado o no pertenece al usuario' });
        }

        // Formatear el campo 'type'
        const formattedExpense = {
            ...updatedExpense.toObject(),
            type: Array.isArray(updatedExpense.type)
                ? updatedExpense.type.map(t => t.name)
                : updatedExpense.type?.name || 'No Type',
        };

        res.status(200).json({
            message: 'Gasto actualizado correctamente',
            formattedExpense,
        });
    } catch (error) {
        console.error('Error al actualizar gasto:', error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un gasto específico
export const deleteExpense = async (req, res) => {
    try {
        const { id, idUser } = req.params;

        const deletedExpense = await Expense.findOneAndDelete({ _id: id, idUser });

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado o no pertenece al usuario' });
        }

        res.status(200).json({ message: 'Gasto eliminado' });
    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
