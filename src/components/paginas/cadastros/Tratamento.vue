<template>
  <div class="container cadastro">
    <div class="card mt-5">
      <div class="card-header">
        <titulo titulo="Tratamento" />
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
                placeholder="Digite o nome"
                v-model="tratamento.name"
              />
            </div>
            <!--
            <div class="form-group col-sm-4">
              <label for="nome">Data de Entrega</label>
              <input
                type="date"
                id="name"
                name="name"
                class="form-control"
                v-model="tratamento.dt_entrega"
                placeholder="Digite a data"
              />
            </div>
            -->
            <div class="form-group col-sm-3">
              <label for="id_sistema">Sistema</label>
              <select
                name="id_sistema"
                v-model="tratamento.id_sistema"
                id="id_sistema"
                class="form-control"
              >
                <option v-for="s in sistemas" :value="s.id">
                  {{ s.nome_sistema }}
                </option>
              </select>
            </div>
            <div class="form-group col-sm-3">
              <label for="requisito">Requisto</label>
              <select
                name="id_requisito"
                v-model="tratamento.id_requisito"
                id="id_requisito"
                class="form-control"
              >
                <option v-for="r in requisitos" :value="r.id">
                  {{ r.nome }}
                </option>
              </select>
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
              <th scope="col">Sistema</th>
              <th scope="col">Requisito</th>
              <th scope="col">Responsável</th>
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
import Persistencia from "../../../persistencia/TratamentoP";
import Tratamento from "../../../model/TratamentoM";
import PersistenciaRequisito from "../../../persistencia/RequisitoP";
import PersistenciaSistema from "../../../persistencia/SistemaP";

export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false,
      acao: "",
      tramamento: new Tratamento(),
      erros: [],
      sistemas: [],
      requisitos: [],
    };
  },
  methods: {
    // realiza o cadastro
    cadastrar() {
      // limpa os erros
      this.limparErros();
       this.tratamento.sessao = sessionStorage.getItem("usuario_ativo");
      if (this.tratamento.sessao != null) {
          this.tratamentoP.cadastrar(this.tratamento);
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

      if (document.getElementById("id_requisito").value == "") {
        this.erros.push("Tipo de Requisito não pode ser vazio");
        dados = false;
      }
      if (document.getElementById("id_sistema").value == "") {
        this.erros.push("Tipo de Sistema não pode ser vazio");
        dados = false;
      }

      return dados;
    },
    consultar(e) {
      let sessao = sessionStorage.getItem("usuario_ativo");

      if (sessao != null) {
        let id = e;
        // usando o metodo de consulta
        this.tratamentoP.consultar(id).then((t) => (this.tramamento = t));
        this.acao = "Atualizar";
        this.mostrar = true;
      } else {
        this.$router.push("/");
      }
    },
    deletar(e) {
      let sessao = sessionStorage.getItem("usuario_ativo");

      if (sessao != null) {
        let id = e;
        // deletando as informaçoes
        if (this.tratamentoP.deletar(id)) {
          // leva para a tela de listar
          this.mostrar = false;
          // atualiza a lista de usuarios
          document.location.reload(true);
        }
      } else {
        this.$router.push("/");
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
      this.tratamento = new Tratamento();
      this.limparErros;
    },
    limparErros() {
      this.erros = [];
    },
  },

  created() {
    let sessao = sessionStorage.getItem("usuario_ativo");

    if (sessao != null) {
      // instancia as persistencia
      this.tratamentoP = new Persistencia(this.$resource);
      this.sistemaP = new PersistenciaSistema(this.$resource);
      this.requisitoP = new PersistenciaRequisito(this.$resource);

      this.sistemaP.listar().then(
        (s) => (this.sistemas = s),
        (erro) => {}
      );
      this.requisitoP.listar().then(
        (r) => (this.requisitos = r),
        (erro) => {}
      );
    } else {
      this.$router.push("/");
    }
  },
};
</script>