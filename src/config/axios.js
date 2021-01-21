// importando componentes 
import Vue from 'vue'
import axios from 'axios'

// usando o vue
Vue.use({
    install(Vue) {
        // criando a conexao
        Vue.prototype.$http = axios.create({
            // url base
            baseURL: '',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;multipart/form-data;'
            }
        })
    }
})