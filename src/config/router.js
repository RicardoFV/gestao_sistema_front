// importa o vue
import Vue from 'vue';
// importendo a rota
import Router from 'vue-router';

// importando as telas
import Login from '../components/paginas/acesso/Login'
import Usuario from '../components/paginas/cadastros/Usuario'

// instancia a rota
Vue.use(Router)

//  criando as rotas
export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: Login,
            name: 'login'
        },
        {
            path: '/cad_usuario',
            component: Usuario,
            name: 'cadastro_usuario'
        }
    ]
})