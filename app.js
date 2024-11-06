import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());

//Ruta inicial
app.get('/', (req, res) => {
    res.send(messages.Welcome)
});

app.use(cors(
    {
        origin: "*",
        methods: ["POST", "PUT", "DELETE", "GET"],
        credentials: true
    }
))

import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

export default app;