<template>
    <div class='topartists'>
      <h1>Top Artists</h1>
      <div id = "top">
      <button v-on:click="page_state = 'short'">Past Month</button>
      <button v-on:click="page_state = 'medium'">Past 6 Months</button>
      <button v-on:click="page_state = 'long'">Ever</button>
      </div>
      <template v-if="this.userArtistsShort">    
      <!--<img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">-->
        <!--<img :src="this.userArtistsShort.items[0].images[2].url" alt="artist_picture">-->
        <div v-for="n in 20" :key="n" class="list">
          <!--<img v-bind:src="`this.userArtistsShort.items[0].images[2].url`">-->
          <!--<img src="https://i.scdn.co/image/6c785e6be62ae82a5222578045439fc235086f64">-->
          <!--<img :src="this.userArtistsShort.items[0].images[2].url" alt="artist_picture">-->
          <!--<img :src="this.$store.state.topArtistsShort.items[0].images[2].url" alt="artist_picture">-->
          <img :src=getImage(n-1)>
          <div class='artist-text'>{{ getName(n-1) }}</div>
        </div>
      </template>
      <template v-else>
        <h1>loading...</h1>
      </template>
    </div>
</template>

<script>
import { getTopArtists } from "../services/spotifyApi";
export default {
  name: 'TopArtists',
  data () {
    return {
      msg: 'Top artists page',
      page_state: 'short'
    }
  },
  // might not need this
  computed: {
    userArtistsShort () {
      return this.$store.getters.getTopArtistsShort
    },
    userArtistsMedium () {
      return this.$store.getters.getTopArtistsMedium
    },
    userArtistsLong () {
      return this.$store.getters.topArtistsLong
    }
  },
  methods: {
    getTopArtists2 () {
      getTopArtists().then((response) => {
        // this.$store.commit('setUser', response.user);
        console.log("artists response data:");
        console.log(response)
        this.$store.commit('setTopArtists', response);
        console.log("INFO:");
        console.log(this.$store.state.topArtistsShort);
      });
    },
    // get artist image based on the page state
    getImage (index) {
      switch (this.page_state) {
        case 'short':
          return this.$store.getters.getTopArtistsShort.items[index].images[2].url;
        case 'medium':
          return this.$store.getters.getTopArtistsMedium.items[index].images[2].url;
        case 'long':
          return this.$store.getters.getTopArtistsLong.items[index].images[2].url;
      }
    },
    // get artist name base on the page state
    getName (index) {
      switch (this.page_state) {
        case 'short':
          return this.$store.getters.getTopArtistsShort.items[index].name;
        case 'medium':
          return this.$store.getters.getTopArtistsMedium.items[index].name;
        case 'long':
          return this.$store.getters.getTopArtistsLong.items[index].name;
      }
    }
  },
  created () {
    this.getTopArtists2();
  }
}
</script>

<style scoped>
h1 {
  color: #ff741e;
}
#top {
  display: block;
}
.list{
  display: inline-block;
  width: 20%;
  margin: 30px 0;
}
img {
  border-radius: 50%;
  display: inline-block;
  border: 4px double #e42c6a;
}
.artist-text{
  color: #fcd02c;
}
</style>
