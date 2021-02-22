export default class RequisitoP {
    constructor(resource) {
        this._resource = resource('requisito{/id}')
    }

    cadastrar(requisito) {
        // cadastra 
        if (requisito.id == null || requisito.id == 0) {

            return this._resource.save(requisito).then(null, erro => {
                console.log(erro)
            })
        } else {
            //altera
            return this._resource.update({ id: requisito.id }, requisito)
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