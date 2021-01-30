import Vue from 'vue'
import App from './App.vue'

// importando o router de forma global
import router from './config/router'
//import './config/axios'
import VueResource from 'vue-resource';

//Vue.config.productionTip = false
// REGISTRANDO DE FORMA GLOBAL O VUERESOURCE
Vue.use(VueResource)
    // trantando o link da aplicação padrao
Vue.http.options.root = 'http://localhost:8181';

new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})