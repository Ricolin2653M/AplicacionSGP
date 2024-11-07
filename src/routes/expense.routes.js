import express from 'express';
const router = express.Router();

import * as expenseCtrl from '../controllers/expense.controller.js'


// Crear Gasto
router.post('/', expenseCtrl.createExpense);

// Obtener todos los gastos de un usuario específico
router.get('/:idUser', expenseCtrl.getExpenses);

// Actualizar un gasto específico
router.put('/:idUser/:id', expenseCtrl.updateExpense);

// Eliminar un gasto específico
router.delete('/:idUser/:id', expenseCtrl.deleteExpense);


export default router;