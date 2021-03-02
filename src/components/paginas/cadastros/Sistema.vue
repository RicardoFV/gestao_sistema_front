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
        <form>
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
                id="nome"
                name="nome"
                class="form-control"
                v-model="sistema.name"
                placeholder="Digite o nome"
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="id_versao">Versao</label>
              <select name="id_versao" id="id_versao" class="form-control">
                <option v-for="v of versoes" :value="v.id">{{ v.name }}</option>
              </select>
            </div>
            <div class="form-group col-sm-4">
              <label for="arquivo">Imagem</label>
              <input type="file" class="form-control-file" id="arquivo" />
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
    };
  },

  methods: {
    consultar(e) {},
    deletar(e) {},

    novo() {
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

    cadastrar() {},
  },

  created() {
    // instancia as persistencia
    this.sistemaP = new PersistenciaSistema(this.$resource);
    this.versaoP = new PersistenciaVersao(this.$resource);

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