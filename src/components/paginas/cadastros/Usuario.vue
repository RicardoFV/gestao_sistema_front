<template>
  <div class="container">
    <div class="card mt-2">
      <div class="card-header">
        <titulo titulo="Usuario" />
      </div>
      <div class="form-row col-sm-12">
        <div class="form-group col-sm-6 d-flex inline mt-3">
          <input
            type="text"
            class="form-control col-sm-4 mr-1 ml-2"
            placeholder="Digite seu nome"
          />
          <botao
            tipo="submit"
            acao="Consultar"
            desing="btn btn-secondary col-sm-4 btn-sm mr-5"
          />
        </div>
        <div class="form-group col-sm-6 d-flex inline mt-3">
          <button
            class="btn btn-primary col-sm-4 btn-sm mr-1"
            @click="mostrar = !mostrar"
          >
            {{ mostrar ? "Ver" : "Novo" }}
          </button>
          <botao
            tipo="submit"
            acao="Deletar"
            desing="btn btn-danger col-4 btn-sm mr-1"
          />
        </div>
      </div>

      <hr />

      <div class="card-body" v-if="mostrar">
        <form @submit.prevent="cadastrar()" @submit="validar()">

        <p v-if="erros.length">
          <b>Por Favor corriga os seguinte(s) erro(s) :</b>
          <ul>
            <li v-for="erro in erros">{{ erro }}</li>
          </ul>
        </p>
          
          <div class="form-check mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="1"
              v-model="user.situacao"
            />
            <label class="form-check-label" type="checkbox" value="0">
              Ativo
            </label>
          </div>

          <div class="form-row">
            <div class="form-group col-sm-1">
              <label for="codigo">Código</label>
              <input
                type="text"
                id="codigo"
                class="form-control"
                name="codigo"
                readonly
                v-model="user.codigo"
              />
            </div>
            <div class="form-group col-sm-4">
              <label for="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                class="form-control"
                placeholder="Digite o nome"
                v-model="user.nome"
              />
            </div>
            <div class="form-group col-sm-4">
              <label for="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Digite o E-mail"
                v-model="user.email"
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="perfil_acesso">Perfil Acesso</label>
              <select
                class="form-control"
                v-model="user.perfil_acesso"
                name="perfil_acesso"
                id="perfil_acesso"
              >
                <option value="adm">Administrador</option>
                <option value="user">Usúario</option>
              </select>
            </div>
            <div class="form-group col-sm-3">
              <label for="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                class="form-control"
                placeholder="Digite a senha"
                v-model="user.senha"
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="repetir_senha">Confirma Senha</label>
              <input
                type="password"
                id="repetir_senha"
                name="repetir_senha"
                class="form-control"
                placeholder="Repita a senha"
                v-model="user.repetir_senha"
              />
            </div>
          </div>

          <div class="form-group">
            <botao
              tipo="submit"
              acao="Cadastrar"
              desing="btn btn-block btn-success"
            />
          </div>
        </form>
      </div>

      <!-- criação da tabela  -->
      <div class="container" v-else>
        <table class="table">
          <thead class="text-center">
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Perfil</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import titulo from "../../template/Titulo";
import botao from "../../template/Botao";
import Usuario from "../../../model/UsuarioM";
import Persistencia from "../../../persistencia/UsuarioP";

export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false,
      user: new Usuario(),
      erros :[] 
    };
  },
  methods: {
    cadastrar() {
      if (this.validar() === true) {
        // passa os dados para a persistencia
        this.$http.post("/usuario", this.user).then(res => {
            console.log(res)
        })
       // this.userP.cadastrar(this.user)
      }
    },

    // valida as informaçoes 
    validar() {
      if ($('#nome').val() === "" || $('#nome').val() === null) {
        this.erros.push('O campo nome nao pode ser vazio !')
        dados = false;
      }
      if ($('#email').val() === "" || $('#nome').val() === null) {
        this.erros.push('O campo E-mail nao pode ser vazio !')
        dados = false;
      }
       let dados = true;
      if ($('#senha').val()  !== $('#repetir_senha').val()) {
        this.erros.push('As senhas digitadas não conferem !')
        dados = false;
      }
      if ($('#senha').val() === "" || $('#repetir_senha').val() === "") {
        this.erros.push('As Senhas não podem ser vazio !')
        dados = false;
      }
      return dados;
    },
  },
  created() {
    this.userP = new Persistencia();
  },
};
</script>


