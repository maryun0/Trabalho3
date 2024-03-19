import EventoDAO from "../Persistencia/EventoDAO.js";

export default class Evento {
    #Codigo;
    #Sobre_Evento;
    #Nome_Evento;
    #Data_Hora;
    #Local_Evento;
    #Preco;
    #Quantidade_ingresso;
    #telefone;
    #email;

    constructor(Codigo = 0, Sobre_Evento = "", Nome_Evento = "", Data_Hora = "", Local_Evento = "", Preco = "", Quantidade_ingresso = "", telefone = "", email = "") {
        this.#Codigo = Codigo;
        this.#Sobre_Evento = Sobre_Evento;
        this.#Nome_Evento = Nome_Evento;
        this.#Data_Hora = Data_Hora;
        this.#Local_Evento = Local_Evento;
        this.#Preco = Preco;
        this.#Quantidade_ingresso = Quantidade_ingresso;
        this.#telefone = telefone;
        this.#email = email;
    }

    get Codigo(){
        return this.#Codigo;
    }    
    set Codigo(novoCodigo){
        this.#Codigo = novoCodigo;
    }

    get Sobre_Evento(){
        return this.#Sobre_Evento;
    }

    set Sobre_Evento(novoSobre_Evento){
        this.#Sobre_Evento = novoSobre_Evento;
    }

    get Nome_Evento(){
        return this.#Nome_Evento;
    }

    set Nome_Evento(novoNome_Evento){
        this.#Nome_Evento = novoNome_Evento;
    }

    get Data_Hora(){
        return this.#Data_Hora;
    }

    set Data_Hora(novoData_Hora){
        this.#Data_Hora = novoData_Hora;
    }

    get Local_Evento(){
        return this.#Local_Evento;
    }

    set Local_Evento(novoLocal_Evento){
        this.#Local_Evento = novoLocal_Evento;
    }

    get Preco(){
        return this.#Preco;
    }

    set Preco(novoPreco){
        this.#Preco = novoPreco;
    }

    get Quantidade_ingresso(){
        return this.#Quantidade_ingresso;
    }

    set Quantidade_ingresso(novoQuantidade_ingresso){
        this.#Quantidade_ingresso = novoQuantidade_ingresso;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    async gravar(){
        const dao = new EventoDAO();
        await dao.gravar(this); 
    }

    async atualizar(){
        const dao = new EventoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new EventoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }


    toString(){
        return `Evento código: ${this.#Codigo} -  nome: ${this.#Sobre_Evento}`;
    }

    toJSON(){
        return {
            "Codigo": this.#Codigo,
            "Sobre_Evento": this.#Sobre_Evento,
            "Nome_Evento": this.#Nome_Evento,
            "Data_Hora": this.#Data_Hora,
            "Local_Evento": this.#Local_Evento,
            "Preco": this.#Preco,
            "QuantIdade_ingresso": this.#Quantidade_ingresso,
            "telefone": this.#telefone,
            "email": this.#email
        }
    }
}
