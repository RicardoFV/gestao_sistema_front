<template>
  <div class="container cadastro">
    <div class="card mt-5">
      <div class="card-header">
        <titulo titulo="Sistema" />
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
          <div class="form-row mb-2">
            <div class="form-group col-sm-1">
              <label for="codigo">Código</label>
              <input
                type="text"
                id="codigo"
                class="form-control"
                name="codigo"
                v-model="sistema.id"
                readonly
              />
            </div>
            <div class="form-group col-sm-4">
              <label for="nome">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                v-model="sistema.name"
                placeholder="Digite o nome"
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="id_versao">Versao</label>
              <select
                name="id_versao"
                id="id_versao"
                v-model="sistema.id_versao"
                class="form-control"
              >
                <option v-for="v of versoes" :value="v.id">{{ v.name }}</option>
              </select>
            </div>
            <div class="form-group col-sm-4">
              <label for="arquivo">Imagem</label>
              <input
                type="file"
                @change="upload"
                name="arquivo"
                class="form-control-file"
                id="arquivo"
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="descricao">Descrição</label>
              <textarea
                name="descricao"
                v-model="sistema.descricao"
                placeholder="Digite a descrição"
                class="form-control"
                id="descricao"
                cols="30"
                rows="3"
              ></textarea>
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
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nome</th>
              <th scope="col">Versão</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody v-for="s of sistemas">
            <tr class="text-center">
              <td> {{ s.id }} </td>
              <td> {{ s.nome_sistema }} </td>
              <td> {{ s.nome_versao }} </td>
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
import PersistenciaSistema from "../../../persistencia/SistemaP";
import PersistenciaVersao from "../../../persistencia/VersaoP";
import Sistema from "../../../model/SistemaM";
import PersistenciaAutenticar from "../../../persistencia/AutenticarP";
export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false,
      sistema: new Sistema(),
      acao: "",
      erros: [],
      sistemas: [],
      versoes: [],
      file: null,
    };
  },

  methods: {
    upload(e) {
      //recebe o arquivo
      this.file = e.target.files[0];
    },
    // realiza o cadastro
    cadastrar() {
      // limpa os erros
      this.limparErros();
      // valida se o formulario foi preenchido corretamente
      if (this.validar() == true) {
        this.sistema.sessao = sessionStorage.getItem("usuario_ativo");
        var arquivo = new FormData();
        arquivo.append("arquivo", this.file);
        arquivo.append("name", this.sistema.name);
        arquivo.append("descricao", this.sistema.descricao);
        arquivo.append("id_versao", this.sistema.id_versao);
        arquivo.append("sessao", this.sistema.sessao);
        // se tudo ok, insere o registro 
        this.sistemaP.cadastrar(arquivo);

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

      if (document.getElementById("id_versao").value == "") {
        this.erros.push("Tipo de Versão não pode ser vazio");
        dados = false;
      }
      if ($("#descricao").val() === "" || $("#descricao").val() === null) {
        this.erros.push("O campo Descriçao nao pode ser vazio !");
        dados = false;
      }

      return dados;
    },
    consultar(e) {
      if (this.autenticar.verificarSessao(sessionStorage.getItem("usuario_ativo")) ) {

      }else{
        
      }

    },
    deletar(e) {
      if (this.autenticar.verificarSessao(sessionStorage.getItem("usuario_ativo"))) {

      }else{
        
      }
    },

    novo() {
      //console.log(this.sistemas)
      this.acao = "Cadastrar";
      this.limparDados();
      this.mostrar = !this.mostrar;
    },
    // limpar tela
    limparDados() {
      this.sistema = new Sistema();
      this.limparErros;
    },
    limparErros() {
      this.erros = [];
    },
  },

  created() {
    // instancia as persistencia
    this.sistemaP = new PersistenciaSistema(this.$resource);
    this.versaoP = new PersistenciaVersao(this.$resource);
    // instancia a autenticacao
    this.autenticar = new PersistenciaAutenticar(this.$resource);

    // preenchendo a versao
    this.versaoP.listar().then(
      (v) => (this.versoes = v),
      (err) => {
        err.message();
      }
    );

    // preenchendo o sistema
    this.sistemaP.listar().then(
      (s) => (this.sistemas = s),
      (err) => {
        err.message();
      }
    );
  },
};
</script>