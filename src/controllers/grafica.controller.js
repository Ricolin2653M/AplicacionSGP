//Imports para la grafica de gastos
import Expense from '../models/Expense.js';
import TypeExpense from '../models/TypeExpense.js';

//Imports para la grafica de depositos
import Deposit from '../models/Deposit.js';
import TypeDeposit from '../models/TypeDeposit.js';
import mongoose from 'mongoose';


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

        // Extraer los tipos y los totales en dos arreglos
        const types = Object.keys(typeSummary); // Tipos
        const totals = Object.values(typeSummary); // Totales

        // Responder con los tipos y los totales
        res.status(200).json({ types, totals });
    } catch (error) {
        console.error('Error al obtener gastos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

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

        // Extraer los tipos y los totales en dos arreglos
        const types = Object.keys(typeSummary); // Tipos
        const totals = Object.values(typeSummary); // Totales

        // Responder con los tipos y los totales
        res.status(200).json({ types, totals });
    } catch (error) {
        console.error('Error al obtener depósitos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};








