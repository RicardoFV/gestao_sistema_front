import Vue from 'vue'
import App from './App.vue'

// importando o router de forma global
import router from './config/router'
import axios from './config/axios'

Vue.config.productionTip = false

new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})