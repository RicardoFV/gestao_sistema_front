export default class SistemaP {
    constructor(resource) {
        this._resource = resource('sistema{/id}')
    }
    cadastrar(sistema) {
        // cadastra 
        if (sistema.id == null || sistema.id == 0) {

            return this._resource.save(sistema).then(null, erro => {
                console.log(erro)
            })
        } else {
            //altera
            return this._resource.update({ id: sistema.id }, sistema)
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