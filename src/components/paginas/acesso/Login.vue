<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 row d-flex justify-content-center login ml-1">
        <div class="card">
          <div class="card-header">
            <titulo titulo="Bem vindo ao Gestão de Sistemas" />
          </div>
          <div class="card-body">
            <form>
              <div class="form-row">
                <div class="form-group col-sm-12">
                  <label for="email">E-mail</label>
                  <input
                    class="form-control"
                    type="text"
                    name="email"
                    id="email"
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
                <botao
                  tipo="submit"
                  acao="Acessar"
                  desing="btn btn-block btn-success"
                />
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
export default {
  components: { titulo, botao },
  data() {
    return {};
  },
  methods: {},
  created(){

  }
};
</script>