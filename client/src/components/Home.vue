<template>
    <div class='home'>
      <template v-if="this.user">
        <h1>Hey</h1>
      <!--<h1>Hi there, {{ this.user.display_name }}</h1>-->
      <!--<img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">
      <p>Email address: {{ this.user.email }}</p>
      <p>
        <a :href="this.user.external_urls.spotify">Link to your profile</a>
      </p>
      <p>Number of followers: {{ this.user.followers.total }}</p>
      <p>
        <button v-on:click="logOut()" class="btn btn-primary">Log out</button>
      </p>-->
      </template>
      <template v-else>
        <h1>Log in to Spotify using Authorization Code flow</h1>
        <a href="http://localhost:8081/login" class="btn btn-primary">Log in with Spotify</a><br>
      </template>
    </div>
</template>

<script>
// import { getUser } from "../services/spotifyApi.js";
import Vue from 'vue';
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home page'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout () {
      this.$store.commit('setUser', null);
      this.$router.push({name: 'Home'});
    }
  },
  created () {
    if (this.$route.query) {
      Vue.axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + this.$route.query.access_token,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.$store.commit('setUser', response.data);
        console.log('Response from server: ');
        console.log(this.$store.state.user);
      })
    }
  }
  // get user information
  /*
  created () {
    if (this.$route.query){
      const { data } = await getUser();
      //TODO set data in the store
    }
  } */
}
</script>
