import express from 'express';
const router = express.Router();

import * as graficaCtrl from '../controllers/grafica.controller.js'



// Obtener todos los gastos de un usuario específico
router.get('/:idUser', graficaCtrl.getExpensesGrafico);

// Obtener todos los depositos de un usuario específico
router.get('/:idUser', graficaCtrl.getDepositsGrafico);


export default router;