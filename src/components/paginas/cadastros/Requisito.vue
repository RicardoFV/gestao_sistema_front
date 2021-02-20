<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">
        <titulo titulo="Requisito" />
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
                v-model="requisito.id"
                readonly
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="nome">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                placeholder="Digite o nome"
                v-model="requisito.name"
              />
            </div>
            <div class="form-group col-sm-4">
              <label for="tipo_requisito">Tipo Requisito</label>
              <select
                name="tipo_requisito"
                v-model="requisito.tipo_requisito"
                id="tipo_requisito"
                class="form-control"
              >
                <option value="funcional">Funcional</option>
                <option value="nao_funcional">Não Funcional</option>
              </select>
            </div>
            <div class="form-group col-sm-3">
              <label for="descricao">Descrição</label>
              <textarea
                name="descricao"
                v-model="requisito.descricao"
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
              <th scope="col">Tipo Requisito</th>
              <th scope="col">Descrição</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody v-for="r of requisitos">
            <tr class="text-center">
              <td>{{ r.id }}</td>
              <td>{{ r.name }}</td>
              <td>{{ r.tipo_requisito }}</td>
              <td>{{ r.descricao }}</td>
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
import Persistencia from "../../../persistencia/RequisitoP";
import RequisitoM from "../../../model/RequisitoM";

export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false,
      requisito: new RequisitoM(),
      acao: "",
      erros: [],
      requisitos: [],
    };
  },

  methods: {
    novo() {
      this.acao = "Cadastrar";
      this.limparDados();
      this.mostrar = !this.mostrar;
    },

    limparDados() {
      this.requisito = new RequisitoM();
      this.limparErros;
    },

    cadastrar() {
      this.limparErros();
      if (this.validar() == true) {
        this.requisito.sessao = sessionStorage.getItem("usuario_ativo");
        this.requisitoP.cadastrar(this.requisito);
        // limpa as informaçoes
        this.limparDados();
        // leva para a tela de listar
        this.mostrar = false;
        // atualiza a lista de usuarios
        document.location.reload(true);
      }
    },
    consultar(e) {},
    deletar(e) {},
    limparErros() {
      this.erros = [];
    },

    // valida as informaçoes
    validar() {
      var dados = true;
      if ($("#name").val() === "" || $("#name").val() === null) {
        this.erros.push("O campo nome nao pode ser vazio !");
        dados = false;
      }

      if (document.getElementById("tipo_requisito").value == "") {
        this.erros.push("Tipo requisito não pode ser vazio");
        dados = false;
      }
      if ($("#descricao").val() === "" || $("#descricao").val() === null) {
        this.erros.push("O campo Descriçao nao pode ser vazio !");
        dados = false;
      }

      return dados;
    },
  },
  created() {
    this.requisitoP = new Persistencia(this.$resource);
    this.requisitoP.listar().then(
      (dados) => (this.requisitos = dados),
      (err) => {}
    );
  },
};
</script>