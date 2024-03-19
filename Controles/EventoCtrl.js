import Evento from "../Modelos/Evento.js";

export default class EventoCtrl{

    gravar(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const Sobre_Evento = dados.Sobre_Evento;
            const Nome_Evento = dados.Nome_Evento;
            const Data_Hora = dados.Data_Hora;
            const Local_Evento = dados.Local_Evento;
            const Preco = dados.Preco;
            const Quantidade_ingresso = dados.Quantidade_ingresso;
            const telefone = dados.telefone;
            const email = dados.email;

         
            if (Sobre_Evento && Nome_Evento && Data_Hora && Local_Evento && Preco && Quantidade_ingresso && telefone && email){
                const evento = new Evento(0, Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento, Preco, Quantidade_ingresso, telefone, email);
                evento.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento gravado com sucesso!",
                        "Codigo_evento": evento.Codigo
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválIda! Esperando o método POST e dados no formato JSON para gravar um evento!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const Codigo = requisicao.params.Codigo;
            const Sobre_Evento = dados.Sobre_Evento;
            const Nome_Evento = dados.Nome_Evento;
            const Data_Hora = dados.Data_Hora;
            const Local_Evento = dados.Local_Evento;
            const Preco = dados.Preco;
            const Quantidade_ingresso = dados.Quantidade_ingresso;
            const telefone = dados.telefone;
            const email = dados.email;
            if (Codigo && Codigo > 0 && Sobre_Evento && Nome_Evento && Data_Hora && Local_Evento && Preco && Quantidade_ingresso && telefone && email)
            {
                const evento = new Evento(Codigo, Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento, Preco, Quantidade_ingresso, telefone, email);
                evento.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do evento, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválIda! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um evento!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            const Codigo = requisicao.params.Codigo;
            if (Codigo && Codigo > 0){
                const evento = new Evento(Codigo);
                evento.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o evento! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do evento que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválIda! Esperando o método DELETE para excluir um evento!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((eventos)=>{
                resposta.status(200);
                resposta.json(eventos);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os eventos! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválIda! Esperando o método GET para consultar os eventos!"
            })
        }
    }

}