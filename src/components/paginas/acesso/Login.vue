<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 row d-flex justify-content-center login ml-1">
        <div class="card">
          <div class="card-header">
            <titulo titulo="Bem vindo ao Gestão de Sistemas" />
          </div>
          <div class="card-body">
            <form @submit.prevent="autenticar">
              <div class="form-row">
                <div class="form-group col-sm-12">
                  <label for="email">E-mail</label>
                  <input
                    class="form-control"
                    type="text"
                    name="email"
                    id="email"
                    v-model="auth.email"
                    placeholder="Digite seu E-mail"
                  />
                </div>
                <div class="form-group col-sm-12">
                  <label for="senha">Senha</label>
                  <input
                    class="form-control"
                    type="password"
                    name="senha"
                    id="senha"
                    v-model="auth.senha"
                    placeholder="Digite sua Senha"
                  />
                </div>
              </div>
              <div class="mb-2 d-flex justify-content-end">
                <router-link class="btn btn-primary mr-2 btn-sm" to=""
                  >Esqueci minha senha</router-link
                >
                <!--
                <router-link class="btn btn-primary btn-sm" to="/cad_usuario">Cadastre-se</router-link>
                -->
              </div>
              
              <div class="form-group">
               <button class="btn btn-block btn-success">Acessar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titulo from "../../template/Titulo";
import botao from "../../template/Botao";
import Persistencia from "../../../persistencia/AutenticarP";
import Autenticacao from "../../../model/AutenticacaoM";

export default {
  components: { titulo, botao },
  data() {
    return {
      auth: new Autenticacao(),
    };
  },
  methods: {
    // gera a autenticacao
    autenticar() {
      // chama gerarSessao
      this.gerarSessao();
      // criar sessao
      this.criarSessao();
      // passa a sessao para o objeto
      this.auth.sessao = sessionStorage.getItem("usuario_ativo");

      // verifica o retorno se e 201 ou 405
      // se for 201, realiza a autenticaçao 
      if(this.authP.login(this.auth) == 201){
        this.$router.push('/home')
        // se for 405 volta pra pagina
      }else if(this.authP.login(this.auth) == 405){
        alert('Usuário e/ou senha invalida!')
      }

    },

    // gera uma sessao de numeros interiros aleatorios
    gerarSessao() {
      return Math.floor(Math.random() * 999999999);
    },
    // cria uma sessao que ficara fixa enquanto o navegador estiver aberto
    criarSessao() {
      let sessao = this.gerarSessao();
      sessionStorage.setItem("usuario_ativo", sessao);
    },
  },
  created() {
    this.authP = new Persistencia(this.$resource);
  },
};
</script>