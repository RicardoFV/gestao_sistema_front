<template>
  <div class="container cadastro">
    <div class="card mt-5">
      <div class="card-header">
        <titulo titulo="Tratamento" />
      </div>
      <div class="form-row col-sm-12">
        <div class="form-group col-sm-6 d-flex inline mt-3">
          <input type="text" class="form-control col-sm-4 mr-1 ml-2" placeholder="Digite seu nome" />
          <botao tipo="submit" acao="Consultar" desing="btn btn-secondary col-sm-4 btn-sm mr-5" />
        </div>
        <div class="form-group col-sm-6 d-flex inline mt-3">
          <button class="btn btn-primary col-sm-4 btn-sm mr-1" @click="mostrar = !mostrar" >{{ mostrar ? 'Ver' : 'Novo' }}</button>
          <botao tipo="submit" acao="Deletar" desing="btn btn-danger col-4 btn-sm mr-1" />
        </div>
      </div>

      <hr />

      <div class="card-body" v-if="mostrar">
        <form>
          <div class="form-row mb-2">
            <div class="form-group col-sm-1">
              <label for="codigo">Código</label>
              <input type="text" id="codigo" class="form-control" name="codigo" readonly />
            </div>
            <div class="form-group col-sm-4">
              <label for="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                class="form-control"
                placeholder="Digite o nome"
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="id_sistema">Sistema</label>
              <select name="id_sistema" id="id_sistema" class="form-control">
                <option value="aprovado">Sistema 1</option>
              </select>
            </div>
            <div class="form-group col-sm-3">
              <label for="requisito">Requisto</label>
              <select name="requisito" id="requisito" class="form-control">
                <option value="aprovado">Requisito 1</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <botao tipo="submit" acao="Cadastrar" desing="btn btn-block btn-success" />
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
export default {
  components: { titulo, botao },
  data() {
    return {
      mostrar: false
    };
  }
};
</script>