//Imports para la grafica de gastos
import Expense from '../models/Expense.js';
import TypeExpense from '../models/TypeExpense.js';

//Imports para la grafica de depositos
import Deposit from '../models/Deposit.js';
import TypeDeposit from '../models/TypeDeposit.js';
import mongoose from 'mongoose';


// Obtener todos los gastos por ID de usuario con resumen
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

        // Crear el resumen de montos por tipo
        const typeSummary = formattedExpenses.reduce((acc, expense) => {
            const type = expense.type;
            const amount = expense.amount;

            if (typeof type === "string") {
                // Si el tipo es un string simple
                acc[type] = (acc[type] || 0) + amount;
            } else if (Array.isArray(type)) {
                // Si el tipo es un array, sumar cada tipo
                type.forEach(t => {
                    acc[t] = (acc[t] || 0) + amount;
                });
            }
            return acc;
        }, {});

        // Convertir el resumen en un formato de objeto esperado
        const summaryArray = Object.entries(typeSummary).map(([type, totalAmount]) => ({
            type,
            totalAmount,
        }));

        // Añadir el resumen como el último elemento
        formattedExpenses.push({ typeSummary: summaryArray });

        res.status(200).json(formattedExpenses);
    } catch (error) {
        console.error('Error al obtener gastos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todos los depósitos por ID de usuario con resumen
export const getDepositsGrafico = async (req, res) => {
    try {
        const { idUser } = req.params;

        // Buscar los depósitos del usuario y poblar el campo 'type' con solo el nombre
        const deposits = await Deposit.find({ idUser }).populate('type', 'name');

        // Formatear los depósitos para incluir solo el nombre del tipo de depósito
        const formattedDeposits = deposits.map(deposit => ({
            ...deposit.toObject(),
            type: Array.isArray(deposit.type)
                ? deposit.type.map(t => t.name) // Si es un array, mapear los nombres
                : deposit.type.name || 'No Type', // Si no es un array, tomar el nombre o asignar un valor por defecto
        }));

        // Crear el resumen de montos por tipo
        const typeSummary = formattedDeposits.reduce((acc, deposit) => {
            const type = deposit.type;
            const amount = deposit.amount;

            if (typeof type === "string") {
                // Si el tipo es un string simple
                acc[type] = (acc[type] || 0) + amount;
            } else if (Array.isArray(type)) {
                // Si el tipo es un array, sumar cada tipo
                type.forEach(t => {
                    acc[t] = (acc[t] || 0) + amount;
                });
            }
            return acc;
        }, {});

        // Convertir el resumen en un formato de objeto esperado
        const summaryArray = Object.entries(typeSummary).map(([type, totalAmount]) => ({
            type,
            totalAmount,
        }));

        // Añadir el resumen como el último elemento
        formattedDeposits.push({ typeSummary: summaryArray });

        res.status(200).json(formattedDeposits);
    } catch (error) {
        console.error('Error al obtener depósitos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};






