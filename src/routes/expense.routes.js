import { Router } from "express";
import { authJwt } from "../middlewares";
const router = Router();

import * as expenseCtrl from '../controllers/expense.controller.js'

//Ejemplo para establecer las rutas mediante sus metodos
/*
router.get('/',admisionCtrl.getAdmisiones);
router.get('/:admisionId', admisionCtrl.getAdmisionById);
router.post('/',[authJwt.verifyToken, authJwt.isAdmin], admisionCtrl.createAdmision);
router.put('/:admisionId', [authJwt.verifyToken, authJwt.isAdmin],admisionCtrl.updateAdmision);
router.delete('/:admisionId',[authJwt.verifyToken, authJwt.isAdmin], admisionCtrl.deleteAdmision);
 */

export default router;