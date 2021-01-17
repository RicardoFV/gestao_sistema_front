<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">
        <titulo titulo="Usuarios" />
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
        <form>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="gridCheck1" />
            <label class="form-check-label" for="gridCheck1">
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
              />
            </div>
            <div class="form-group col-sm-3">
              <label for="email">Perfil Acesso</label>
              <select class="form-control" name="" id="">
                <option value="">Administrador</option>
                <option value="">Usúario</option>
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
              />
            </div>
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

      <!-- criação da tabela  -->
      <div class="container" v-else>
        <table class="table">
          <thead class="text-center">
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
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
      mostrar: false,
    };
  },
};
</script>


