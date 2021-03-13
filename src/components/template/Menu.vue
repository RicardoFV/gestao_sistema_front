<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isTelaLogin">
    <router-link class="navbar-brand" to="/home"
      >Gestao de Sistemas</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Alterna navegação"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Cadastros</a
          >
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link to="/cad_requisito" class="dropdown-item" href="#"
              >Requisito</router-link
            >
            <router-link to="/cad_sistema" class="dropdown-item" href="#"
              >Sistema</router-link
            >
            <router-link to="/cad_tratamento" class="dropdown-item" href="#"
              >Tratamento</router-link
            >
            <router-link to="/cad_usuario" class="dropdown-item" href="#"
              >Usuário</router-link
            >
            <router-link to="/cad_versao" class="dropdown-item" href="#"
              >Versão</router-link
            >
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Destaques</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Preços</a>
        </li>
      </ul>
    </div>
    <ul>
      <li class="nav-item">
        <router-link to="/sair" class="dropdown-item" href="#"
          >Sair</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import PersistenciaAutenticar from "../../persistencia/AutenticarP";
import UsuarioM from "../../model/UsuarioM"
export default {
  data() {
    return {
      
      user: new UsuarioM(),
    
    };
  },
  computed: {
    isTelaLogin() {
      this.user.sessao = sessionStorage.getItem("usuario_ativo");
      return this.$route.path !== "/" && this.$route.path !== "/sair" && this.user.sessao !== null;
    },
  },
  created() {
    // instancia a autenticacao
    this.autenticar = new PersistenciaAutenticar(this.$resource);
  }
};
</script>

<style>
</style>