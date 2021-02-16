export default class UsuarioP {

    constructor(resource) {
        this._resource = resource('usuario{/id}')
    }

    cadastrar(usuario) {
        // cadastra 
        if (usuario.id == null || usuario.id == 0) {

            return this._resource.save(usuario).then(null, erro => {
               // console.log(erro)
            })
        } else {
            //altera
            return this._resource.update({ id: usuario.id }, usuario)
        }
    }

    consultar(id) {
        return this._resource.get({ id }).then(resposta => resposta.json(), err => {
            //console.log(err)
        })
    }
    deletar(id) {

        return this._resource.delete({ id }).then(null,  err => {
            console.log(err)
        })

    }
    listar() {
        return this._resource.query().then(resposta => resposta.json(), err => {
            console.log(err)
        })
    }

}