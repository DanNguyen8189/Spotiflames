<template>
    <div class='home'>
      <template v-if="this.user">
        <h1>Hi there, {{ this.user.display_name }}</h1>
        <img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">
        <!--<p>Email address: {{ this.user.email }}</p>-->
        <p>
          <a :href="this.user.external_urls.spotify">Link to your profile</a>
        </p>
        <p>Number of followers: {{ this.user.followers.total }}</p>
        <p>
          <a v-on:click="logOut()" class="btn btn-primary">Log out</a>
          <a v-on:click="goTopArtists()">ACK</a>
        </p>
      </template>
      <template v-else>
        <h1>Spotifire</h1>
        <a href="http://localhost:8081/login" class="btn btn-primary">LOG IN WITH SPOTIFY</a><br>
        <a href=# class="btn btn-primary">VIEW SAMPLE</a>>
      </template>
    </div>
</template>

<script>
// import axios from "axios";
// import { access_token } from "../services/spotifyApi";
import { logout as removeTokens, getUser } from "../services/spotifyApi";
// import { getTopArtistsShort, getTopeArtistsMedium, getTopArtistsLong } from "../services/spotifyApi";

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
    /** logs user out by removing them from the store and removing the locally stored tokens */
    logOut () {
      this.$store.commit('setUser', null);
      removeTokens();
      // console.log("removed tokens");
      window.alert("logged out");
      this.$router.push({name: 'Home'});
      // this.$router.go();
    },
    /** Calls the getUser method from spotifyApi.js */
    getUserInfo () {
      getUser().then((response) => {
        // this.$store.commit('setUser', response.user);
        this.$store.commit('setUser', response.data);
      });
    },
    goTopArtists () {
      this.$router.push('/topartists')
    }
    /* getTopArtistsShort2 () {
      console.log("what the fuck");
      getTopArtistsShort().then((response) => {
        // this.$store.commit('setArtistsShort', response.data);
        console.log("topartistsshort:");
        console.log(response.data);
        console.log(this.$store.state.topArtistsShort);
      });
    } */
  },
  created () {
    console.log("Home on create hook");
    // Look and see if there's an access token in the url, if there is then the user logged in
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    if (hashParams.access_token) {
      console.log("found tokens");
      // get access and refresh tokens from url
      console.log("access token found in home.vue: " + hashParams.access_token);
      console.log("refresh token found in home.vue: " + hashParams.refresh_token);
      /* axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + hashParams.access_token,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log("OOF");
        console.log(this.$store.state.user);
        this.$store.commit('setUser', response.data);
        console.log(response.data);
        console.log('Response from server: ');
        console.log(this.$store.state.user);
      }); */
      // getUserData();
      this.getUserInfo();
      // this.getTopArtistsShort2();
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

<style scoped>
img {
  border-radius: 50%;
  width: 15%;
}
h1 {
  color: #fcd02c;
}
a {
  min-width: 160px;
  width: 20em;
  height: 4em;
  border-radius: 2em;
  background-color: #e56b1f;
  display: block;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  font-weight: 700;
  line-height: 4em;
  margin: auto;
  margin-bottom: 1em;
}
a:focus, a:hover {
  background-color: #ff741e;
}
</style>>
