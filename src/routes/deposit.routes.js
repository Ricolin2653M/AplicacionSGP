import express from 'express';
const router = express.Router();
import * as depositCtrl from '../controllers/deposit.controller.js'

// Crear deposito
router.post('/', depositCtrl.createDeposit);

// Obtener todos los depositos de un usuario específico
router.get('/:idUser', depositCtrl.getDeposits);

// Eliminar un deposito específico
router.delete('/:idUser/:id', depositCtrl.deleteDeposit);

// Actualizar un deposito específico
router.put('/:idUser/:id', depositCtrl.updateDeposit);



export default router;