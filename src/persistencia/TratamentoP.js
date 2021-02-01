export default class TratamentoP {
    constructor(resource) {
        this._resource = resource('tratamento{/id}')
    }

    cadastrar(tratamento) {
        // cadastra 
        if (tratamento.id == null || tratamento.id == 0) {

            return this._resource.save(tratamento).then(null, erro => {
                console.log(erro)
            })
        } else {
            //altera
            return this._resource.uupdate({ id: tratamento.id }, tratamento)
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