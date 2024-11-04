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

export default app;