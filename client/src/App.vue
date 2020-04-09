<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
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
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
}

body {
  min-height: 100%;
  background-color: #32064a;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
