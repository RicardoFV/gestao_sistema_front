// criando a classe
export default class UsuarioM {

    // criando o construtor
    constructor(id, nome, email, senha, repetir_senha, perfil_acesso, situacao) {
        this.id = id;
        this.nome = nome
        this.email = email
        this.senha = senha
        this.repetir_senha = repetir_senha
        this.perfil_acesso = perfil_acesso
        this.situacao = situacao
    }
}