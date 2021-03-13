<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">
        <titulo titulo="Versão" />
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
          <button class="btn btn-primary col-sm-4 btn-sm mr-1" @click="novo()">
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


          <div class="form-row mb-2">
            <div class="form-group col-sm-1">
              <label for="codigo">Código</label>
              <input
                type="text"
                id="codigo"
                class="form-control"
                name="codigo"
                v-model="versao.id"
                readonly
              />
            </div>

            <div class="form-group col-sm-4">
              <label for="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                placeholder="Digite a versão"
                v-model="versao.name"
              />
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-block btn-success">
              {{ acao }}
            </button>
          </div>
        </form>
      </div>

      <!-- criação da tabela  -->
      <div class="container" v-else>
        <table class="table table-hover table-sm">
          <thead class="text-center">
            <tr >
              <th scope="col">Codigo</th>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody v-for="v of versoes">
            <tr class="text-center">
              <td>{{ v.id }}</td>
              <td>{{ v.name }}</td>
              <td>
                <button type="button" class="btn btn-sm btn-primary" @click="consultar(v.id)">Consultar</button>
                <button type="button" class="btn btn-sm btn-danger" @click="deletar(v.id)">Deletar</button>
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
import VersaoM from "../../../model/VersaoM";
import Persistencia from "../../../persistencia/VersaoP";
import PersistenciaAutenticar from "../../../persistencia/AutenticarP";

export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false,
      versao: new VersaoM(),
      acao: "",
      erros: [],
      versoes: [],
    };
  },
  methods: {
    // novo cadastro
    novo() {
      this.acao = "Cadastrar";
      this.limparDados();
      this.mostrar = !this.mostrar;
    },
    // limpar tela
    limparDados() {
      this.versao = new VersaoM();
      this.limparErros;
    },
    limparErros() {
      this.erros = [];
    },
    // metodo que cadastra e altera dados
    cadastrar() {
      this.limparErros();
      if (this.validar() == true) {
        this.versao.sessao = sessionStorage.getItem("usuario_ativo");
        console.log(this.versao);

        this.versaoP.cadastrar(this.versao);
        // limpa as informaçoes
        this.limparDados();
        // leva para a tela de listar
        this.mostrar = false;
        // atualiza a lista de usuarios
        document.location.reload(true);
      }
    },
    // valida as informaçoes
    validar() {
      var dados = true;
      if ($("#name").val() === "" || $("#name").val() === null) {
        this.erros.push("O campo nome nao pode ser vazio !");
        dados = false;
      }
      return dados;
    },

    consultar(e) {
      if (this.autenticar.verificarSessao(sessionStorage.getItem("usuario_ativo"))) {
          let id = e;
        // usando o metodo de consulta
        this.versaoP.consultar(id).then((v) => (this.versao = v));
        this.acao = "Atualizar";
        this.mostrar = true;
      }else{
        this.$router.push("/")
      }
      
    },
    deletar(e) {
      if (this.autenticar.verificarSessao(sessionStorage.getItem("usuario_ativo"))) {
        let id = e;
        // deletando as informaçoes
        if (this.versaoP.deletar(id)) {
          // leva para a tela de listar
          this.mostrar = false;
          // atualiza a lista de usuarios
          document.location.reload(true);
        }
      } else {
        this.$router.push("/")
      }
    },
  },
  created() {
    // instancia a persistencia
    this.versaoP = new Persistencia(this.$resource);

    // instancia a autenticacao
    this.autenticar = new PersistenciaAutenticar(this.$resource);

    // listar
    this.versaoP.listar().then(
      (dados) => (this.versoes = dados),
      (err) => {}
    );


  },
};
</script>