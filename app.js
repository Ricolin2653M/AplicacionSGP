import cors from 'cors';
import express from 'express';

//-----RUTAS-----
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
//Rutas para depositos y gastos
import depositRoutes from './src/routes/deposit.routes.js'
import expenseRoutes from './src/routes/expense.routes.js'

const app = express();
app.use(express.json());

//Ruta inicial
app.get('/', (req, res) => {
    res.send("Hola, ruta base de la API")
});

app.use(
    cors(
        {
            origin: "*",
            methods: ["POST", "PUT", "DELETE", "GET"],
            credentials: true
        }
    )
)

//Endpoints/rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deposit', depositRoutes);
app.use('/api/expense', expenseRoutes);


export default app;