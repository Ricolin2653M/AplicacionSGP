import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(port);
});

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado");
    })
    .catch((error) => {
        console.error("Erorr en la conexión: ", error);
    });

