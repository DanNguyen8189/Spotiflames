<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<SpotifyLogin v-if='accessToken'/>
    <HelloWorld/>-->
    <router-view/>
  </div>
</template>

<script>
/* import HellowWorld from "@/components/HelloWorld";
import SpotifyLogin from "@/components/SpotifyLogin"; */
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
