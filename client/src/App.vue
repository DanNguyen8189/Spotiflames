<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<SpotifyLogin v-if='accessToken'/>
    <HelloWorld/>-->
    <Menu v-if="this.loggedIn">
      <a v-on:click="goHome()">
        <i class="fa fa-fw fa-star-o"></i>
        <span>Home</span>
      </a>
      <a v-on:click="goTopArtists()">
        <i class="fa fa-fw fa-bell-o"></i>
        <span>Top Artists</span>
      </a>
      <a v-on:click="goTopTracks()">
        <i class="fa fa-fw fa-envelope-o"></i>
        <span>Top Tracks</span>
      </a>
      <a v-on:click="logOut()">
        <i class="fa fa-fw fa-envelope-o"></i>
        <span>Log Out</span>
      </a>
    </Menu>
    <router-view/>
  </div>
</template>

<script>
/* import HellowWorld from "@/components/HelloWorld";
import SpotifyLogin from "@/components/SpotifyLogin"; */
import Menu from "./components/Menu.vue";
import { logout as removeTokens } from "./services/spotifyApi";
export default {
  name: 'App',
  components: {
    Menu
  },
  computed : {
    loggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    goHome () {
      this.$router.push('/');
    },
    goTopArtists () {
      this.$router.push('/topartists');
    },
    goTopTracks () {
      this.$router.push('/toptracks');
    },
    /** logs user out by removing them from the store and removing the locally stored tokens */
    logOut () {
      this.$store.commit('clearAll');
      removeTokens();
      // console.log("removed tokens");
      // window.alert("logged out");
      // this.$router.push({name: 'Home'});
      // this.$router.go();
    }
  }
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

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
