<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/home">Gestao de Sistemas</router-link>
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
          >Cadastros</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link to="administrador" class="dropdown-item" href="#">Administrador</router-link>
            <router-link to="contrato" class="dropdown-item" href="#">Contratos</router-link>
            <router-link to="empresa" class="dropdown-item" href="#">Empresa</router-link>
            <router-link to="/cad_usuario" class="dropdown-item" href="#">Usuário</router-link>
            
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
  </nav>
</template>

<script>
</script>

<style>
</style>