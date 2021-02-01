export default class AutenticarP {

    constructor(resource) {
        this._resource = resource('autenticar{/id}')
    }
    login(usuario) {
        //realiza a altenticaçao 
        return this._resource.save(usuario).then(
            (e) => {},
            erro => {}
        )
    }

    sair() {

    }
}