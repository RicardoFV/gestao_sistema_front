<template>
  <div id="app">
    <Menu/>
    <router-view></router-view>
    
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../src/components/template/Footer";
import Menu from "../src/components/template/Menu";
export default {
  // importando o componente
  components: { Footer, Menu }
};
</script>

<style>
body{
  background: #159957; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #155799,
    #159957
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #155799,
    #159957
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
