export default class VersaoP {
    constructor(resource) {
        this._resource = resource('versao{/id}')
    }

    cadastrar(versao) {
        // cadastra 
        if (versao.id == null || versao.id == 0) {

            return this._resource.save(versao).then(null, erro => {
                console.log(erro)
            })
        } else {
            //altera
            return this._resource.update({ id: versao.id }, versao)
        }
    }
    consultar(id) {
        return this._resource.get({ id }).then(resposta => resposta.json(), err => {
            console.log(err)
        })
    }
    deletar(id) {
        if (id !== 0) {
            return this._resource.delete({ id }).then(null, err => {
                console.log(err)
            })
        }
    }
    listar() {
        return this._resource.query().then(resposta => resposta.json(), err => {
            console.log(err)
        })
    }
}