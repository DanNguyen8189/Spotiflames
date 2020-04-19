<template>
  <div class='topartists'>
  <h1>Top Tracks</h1>
    <div id = "top">
        <button v-on:click="changeTimePeriod('short')">Past Month</button>
        <button v-on:click="changeTimePeriod('medium')">Past 6 Months</button>
        <button v-on:click="changeTimePeriod('long')">All Time</button>
    </div>
    <template v-if="this.userTracksShort">
      <div v-for="n in 50" :key="n" class="list">
        <p>{{n}}</p>
        <img :src=getImage(n-1)>
        <div class='track-name'>{{ getTrackName(n-1) }}</div>
        <div class='artist-name'>{{ getArtistName(n-1) }}</div>
        <button v-if="getTrackURL(n-1) !== null" class="btn btn-primary btn-sm"
          @click.prevent="playTrack(n-1)">
          <span class="fa fa-play-circle-o">Arrow Placeholder</span>
        </button>
        <button v-else class="btn btn-primary btn-sm">Preview not available</button>
      </div>
    </template>
    <template v-else>
    <!--This is here because the data from spotify doesn't come fast enough
    for the above template to render right away-->
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
      audioElement: null
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
    /** function to get the top tracks and set them to the vuex store. Response from Spotify is in JSON format */
    getTopTracks2 () {
      getTopTracks().then((response) => {
        // this.$store.commit('setUser', response.user);
        console.log("Tracks response data:");
        console.log(response)
        this.$store.commit('setTopTracks', response);
        // this.$store.commit('setTimePeriod', 'short');
      });
    },
    /** function to change the time period to display */
    changeTimePeriod (state) {
      this.$store.commit('setTimePeriod', state);
    },
    /** function to get album cover image based on the page state */
    getImage (index) {
      return this.$store.getters.getTopTracks.items[index].album.images[2].url;
    },
    /** function get track name */
    getTrackName (index) {
      return this.$store.getters.getTopTracks.items[index].name;
    },
    /** funciton to get artist name */
    getArtistName (index) {
      return this.$store.getters.getTopTracks.items[index].artists[0].name;
    },
    getTrackURL (index) {
      return this.$store.getters.getTopTracks.items[index].preview_url;
    },
    /** function to load currently selected track to play (and pause if it's the same as
     * the currently playing track) */
    playTrack (index) {
      if (this.audioElement) this.audioElement.pause();
      this.audioElement = new Audio(this.getTrackURL(index));
      // this.audioElement.addEventListener('ended', this.stop());
      this.audioElement.play();
    }
  },
  created () {
    this.getTopTracks2();
  }
}
</script>
<style scoped>
h1 {
  color: #ff741e;
}
.track-name {
    color: white;
}
.artist-name {
    color: orange;
}
button {
  cursor: pointer; /* changes the cursor to the hand cursor on hover */
}
</style>
