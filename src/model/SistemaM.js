// criando a classe
export default class SistemaM {

    constructor(sessao, nome, descricao, id_versao, imagem, tamanho_imagem, nome_imagem) {
        this.sessao = sessao
        this.nome = nome
        this.descricao = descricao
        this.id_versao = id_versao
        this.imagem = imagem
        this.tamanho_imagem = tamanho_imagem
        this.nome_imagem = nome_imagem
    }
}