// importa o vue
import Vue from 'vue';
// importendo a rota
import Router from 'vue-router';

// importando as telas
import Login from '../components/paginas/acesso/Login'
import Usuario from '../components/paginas/cadastros/Usuario'
import Versao from '../components/paginas/cadastros/Versao'
import Requisito from '../components/paginas/cadastros/Requisito'
import Sistema from '../components/paginas/cadastros/Sistema'
import Tratamento from '../components/paginas/cadastros/Tratamento'
import Home from '../components/paginas/home/Home'

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
        },
        {
            path: '/home',
            component: Home,
            name: 'home'
        },
        {
            path: '/cad_versao',
            component: Versao,
            name: 'cadastro_versao'
        },
        {
            path: '/cad_requisito',
            component: Requisito,
            name: 'cadastro_requisito'
        },

        {
            path: '/cad_sistema',
            component: Sistema,
            name: 'cadastro_sistema'
        },
        {
            path: '/cad_tratamento',
            component: Tratamento,
            name: 'cadastro_tratamento'
        },
        {
            path: '/sair',
            component: Login,
            name: 'sair_sistema'
        }
    ]
})