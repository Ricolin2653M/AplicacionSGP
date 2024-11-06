import Expense from '../models/Expense.js'
import TypeExpense from '../models/TypeExpense.js'
import mongoose from 'mongoose';

//Aquí van a ir las funciones para el crud de gastos


/* EJEMPLO (ELIMINAR DESPUES)
export const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find();
        res.json(publicaciones);
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
 */