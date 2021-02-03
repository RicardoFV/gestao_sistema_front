export default class AutenticarP {

    constructor(resource) {
        this._resource = resource('autenticar{/id}')
    }

    login(usuario) {
        status
        //realiza a altenticaçao 
        this._resource.save(usuario).then(
            e => {
                status = JSON.parse(e.status)
            },
            erro => {
                status = JSON.parse(erro.status)

            }
        )
        return status;

    }

    sair() {

    }
}