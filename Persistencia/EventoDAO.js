import conectar from "./Conexao.js";
import Evento from "../Modelos/Evento.js";
export default class EventoDAO{
    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento,
                Preco, QuantIdade_ingresso, telefone, email) 
                         values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.Sobre_Evento, 
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.QuantIdade_ingresso,
                evento.telefone,
                evento.email
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            evento.Codigo = resultados.insertCodigo; 
        }
    }

    async atualizar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET Sobre_Evento = ?,
            Nome_Evento = ?, Data_Hora = ?, Local_Evento = ?,
            Preco = ?, QuantIdade_ingresso = ?, telefone = ?,
                         email = ? WHERE Codigo = ?`;
            const parametros = [
                evento.Sobre_Evento, 
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.QuantIdade_ingresso,
                evento.telefone,
                evento.email,
                evento.Codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE Codigo = ?`;
            const parametros = [
                evento.Codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }


    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ 
            sql = `SELECT * FROM evento WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM evento WHERE Id = ?`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        let listaEvento = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.Codigo,
                registro.Sobre_Evento,
                registro.Nome_Evento,
                registro.Data_Hora,
                registro.Local_Evento,
                registro.Preco,
                registro.QuantIdade_ingresso,
                registro.telefone,
                registro.email
            );
            listaEvento.push(evento);
        }
        return listaEvento;
    }
}