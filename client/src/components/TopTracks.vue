<template>
  <div class='topartists'>
  <h1>Top Tracks</h1>
    <div id = "top">
    <button v-on:click="page_state = 'short'">Past Month</button>
    <button v-on:click="page_state = 'medium'">Past 6 Months</button>
    <button v-on:click="page_state = 'long'">All Time</button>
    </div>
    <template v-if="this.userTracksShort">
      <div v-for="n in 20" :key="n" class="list">
        <p>{{n-1}}</p>
        <img :src=getImage(n-1)>
        <div class='track-name'>{{ getTrackName(n-1) }}</div>
        <div class='artist-name'>{{ getArtistName(n-1) }}</div>
        <button class="btn btn-primary btn-sm" 
        @click.prevent="playTrack(n-1)">
        <span class="fa fa-play-circle-o"></span>
        </button>
      </div>
    </template>
    <template v-else>
        <h1>loading...</h1>
    </template>
  </div>
</template>

<script>
import { getTopTracks } from "../services/spotifyApi";
export default {
  name: 'TopTracks',
  data () {
    return {
      msg: 'Top tracks page',
      page_state: 'short'
    }
  },
  // might not need this
  computed: {
    userTracksShort () {
      return this.$store.getters.getTopTracksShort
    },
    userTracksMedium () {
      return this.$store.getters.getTopTracksMedium
    },
    userTracksLong () {
      return this.$store.getters.topTracksLong
    }
  },
  methods: {
    getTopTracks2 () {
      getTopTracks().then((response) => {
        // this.$store.commit('setUser', response.user);
        console.log("Tracks response data:");
        console.log(response)
        this.$store.commit('setTopTracks', response);
        console.log("INFO:");
        console.log(this.$store.state.topTracksShort);
      });
    },
    // get artist image based on the page state
    getImage (index) {
      switch (this.page_state) {
        case 'short':
          return this.$store.getters.getTopTracksShort.items[index].album.images[2].url;
        case 'medium':
          return this.$store.getters.getTopTracksMedium.items[index].album.images[2].url;
        case 'long':
          return this.$store.getters.getTopTracksLong.items[index].album.images[2].url;
      }
    },
    // get artist name base on the page state
    getTrackName (index) {
      switch (this.page_state) {
        case 'short':
          return this.$store.getters.getTopTracksShort.items[index].name;
        case 'medium':
          return this.$store.getters.getTopTracksMedium.items[index].name;
        case 'long':
          return this.$store.getters.getTopTracksLong.items[index].name;
      }
    },
    getArtistName (index) {
      switch (this.page_state) {
        case 'short':
          return this.$store.getters.getTopTracksShort.items[index].artists[0].name;
        case 'medium':
          return this.$store.getters.getTopTracksMedium.items[index].artists[0].name;
        case 'long':
          return this.$store.getters.getTopTracksLong.items[index].artists[0].name;
      }        
    },
    playTrack (index) {
      var link;
      switch (this.page_state) {
        case 'short':
          link = this.$store.getters.getTopTracksShort.items[index].preview_url;
          break;
        case 'medium':
          link = this.$store.getters.getTopTracksMedium.items[index].preview_url;
          break;
        case 'long':
          link = this.$store.getters.getTopTracksLong.items[index].preview_url;
          break;
      }         
      var audio = new Audio(link)
      audio.play(); 
    }
  },
  created () {
    this.getTopTracks2();
  }
}
</script>
<style scoped>
.track-name {
    color: white;
}
.artist-name {
    color: orange;
}
</style>
