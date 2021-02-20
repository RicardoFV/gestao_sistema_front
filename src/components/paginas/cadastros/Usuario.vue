<template>
  <div class="container">
    <div class="card mt-5">
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
            @click="novo()"
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
        <form @submit.prevent="cadastrar()">

         
        <p v-if="erros.length">
          <b>Por Favor corriga os seguinte(s) erro(s) :</b>
          <ul>
            <li v-for="erro in erros">{{ erro }}</li>
          </ul>
        </p>
          
          <div class="form-group col-sm-2">

            <label for="situacao">Situação</label>
              <select
                class="form-control"
                v-model="user.situacao"
                name="perfil_acesso"
                id="situacao"
              >
                <option value="ativado">Ativado</option>
                <option value="desativado">Desativado</option>
              </select>  
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
                v-model="user.id"
              />
            </div>
            <div class="form-group col-sm-4">
              <label for="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                placeholder="Digite o nome"
                v-model="user.name"
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
                <option value="user" >Usúario</option>
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
            <button type="submit" class="btn btn-block btn-success">{{acao}}</button>
          </div>
        </form>
      </div>

      <!-- criação da tabela  -->
      <div class="container" v-else>
        <table class="table table-hover table-sm">
          <thead class="text-center">
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Perfil</th>
              <th scope="col">Dt Inclusão</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody v-for="user of usuarios">
            <tr class="text-center">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.perfil_acesso}}</td>
              <td>{{user.dt_inclusao }}</td>
              <td>
                
                <button type="button" class="btn btn-sm btn-primary" @click="consultar(user.id)">Consultar</button>
                <button type="button" class="btn btn-sm btn-danger" @click="deletar(user.id)">Deletar</button>
                
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import titulo from "../../template/Titulo";
import botao from "../../template/Botao";
import UsuarioM from "../../../model/UsuarioM";
import Persistencia from "../../../persistencia/UsuarioP";

export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false,
      user: new UsuarioM(),
      erros: [],
      usuarios: [],
      acao: "",
    };
  },
  methods: {
    // novo cadastro
    novo() {
      this.acao = "Cadastrar";
      this.limparDados();
      this.mostrar = !this.mostrar;
    },
    // cadastra ou altera um usuario
    cadastrar() {
      this.limparErros();
      if (this.validar() === true) {
        this.userP.cadastrar(this.user);
        // limpa as informaçoes
        this.limparDados();
        // leva para a tela de listar
        this.mostrar = false;
        // atualiza a lista de usuarios
        document.location.reload(true);
      }
    },
    // limpa os erros
    limparErros() {
      this.erros = [];
    },
    // metodo que limpa as informaçoes
    limparDados() {
      this.user = new UsuarioM();
      this.limparErros;
    },
    // consulta as informações
    consultar(e) {
      let id = e;
      // usando o metodo de consulta
      this.userP.consultar(id).then((u) => (this.user = u));
      // passa a senha para o repetir_senha
      this.acao = "Atualizar";
      this.mostrar = true;
    },
    // deleta as informações
    deletar(e) {
      let id = e;
      // deletando as informaçoes 
      if (this.userP.deletar(id)) {
        // leva para a tela de listar
        this.mostrar = false;
        // atualiza a lista de usuarios
        document.location.reload(true);
      }
    },

    // valida as informaçoes
    validar() {
     
      if ($("#name").val() === "" || $("#name").val() === null) {
        this.erros.push("O campo nome nao pode ser vazio !");
        dados = false;
      }
      if ($("#email").val() === "" || $("#nome").val() === null) {
        this.erros.push("O campo E-mail nao pode ser vazio !");
        dados = false;
      }
      let dados = true;
      if ($("#senha").val() !== $("#repetir_senha").val()) {
        this.erros.push("As senhas digitadas não conferem !");
        dados = false;
      }
      if ($("#senha").val() === "" || $("#repetir_senha").val() === "") {
        this.erros.push("As Senhas não podem ser vazio !");
        dados = false;
      }
      if (document.getElementById("situacao").value == "") {
        this.erros.push("Situacao não pode ser vazio");
        dados = false;
      }
      if (document.getElementById("perfil_acesso").value == "") {
        this.erros.push("Perfil de acesso não pode ser vazio");
        dados = false;
      }
      return dados;
    },
  },
  created() {
    // instancia a persistencia
    this.userP = new Persistencia(this.$resource);
    // chama o metodo listar
    this.userP.listar().then(
      (dados) => (this.usuarios = dados),
      (err) => {}
    );
  },
};
</script>


