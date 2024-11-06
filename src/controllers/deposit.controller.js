import Deposit from '../models/Deposit.js'
import TypeDeposit from '../models/TypeDeposit.js'
import mongoose from 'mongoose';

//Aquí van a ir las funciones para el crud de depositos/ingresos 


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