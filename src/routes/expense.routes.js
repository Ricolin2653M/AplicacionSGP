import express from 'express';
const router = express.Router();

import * as expenseCtrl from '../controllers/expense.controller.js'


// Create Expense
router.post('/', expenseCtrl.createExpense);

// Crear Gasto
//router.post('/', expenseCtrl.createExpense);

// Obtener todos los gastos del usuario
//router.get('/', expenseCtrl.getExpenses);

// Actualizar un gasto específico del usuario
//router.put('/:id', expenseCtrl.updateExpense);

// Eliminar un gasto específico del usuario
//router.delete('/:id', expenseCtrl.deleteExpense);


export default router;