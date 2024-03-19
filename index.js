import express from "express";
import rotaEvento from "./Rotas/RotaEvento.js";

const host = '0.0.0.0'; 
const porta = 3000; 

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/eventos',rotaEvento);
app.listen(porta, host, () => {
    console.log(`ServIdor rodando em http://${host}:${porta}`);
});