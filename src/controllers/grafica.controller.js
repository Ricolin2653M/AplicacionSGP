//Imports para la grafica de gastos
import Expense from '../models/Expense.js';
import TypeExpense from '../models/TypeExpense.js';

//Imports para la grafica de depositos
import Deposit from '../models/Deposit.js';
import TypeDeposit from '../models/TypeDeposit.js';
import mongoose from 'mongoose';


// Obtener todos los gastos por ID de usuario 
export const getExpensesGrafico = async (req, res) => {
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


// Obtener todos los depósitos por ID de usuario y formatear el campo 'type'
export const getDepositsGrafico = async (req, res) => {
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





