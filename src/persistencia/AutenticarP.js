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
        // metodo que verifica a sessao
    verificarSessao(sessao) {
        return this._resource.get({ sessao }).then(resposta => resposta.json(), err => {
            console.log(err)
        })
    }

    sair() {

    }
}