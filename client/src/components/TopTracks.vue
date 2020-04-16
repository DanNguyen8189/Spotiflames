<template>
  <div class='topartists'>
  <h1>Top Tracks</h1>
    <div id = "top">
        <button v-on:click="changeTimePeriod('short')">Past Month</button>
        <button v-on:click="changeTimePeriod('medium')">Past 6 Months</button>
        <button v-on:click="changeTimePeriod('long')">Ever</button>
    </div>
    <template v-if="this.userTracksShort">
      <div v-for="n in 20" :key="n" class="list">
        <p>{{n}}</p>
        <img :src=getImage(n-1)>
        <div class='track-name'>{{ getTrackName(n-1) }}</div>
        <div class='artist-name'>{{ getArtistName(n-1) }}</div>
        <button class="btn btn-primary btn-sm"
        @click.prevent="loadTrack(n-1)">
        <span class="fa fa-play-circle-o">Arrow Placeholder</span>
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
const STATUSES = {
  'STOPPED': 0,
  'PAUSED': 1,
  'PLAYING': 2
};
export default {
  name: 'TopTracks',
  data () {
    return {
      msg: 'Top tracks page',
      activeTrack: -1,
      audioElement: null,
      status: STATUSES.STOPPED
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
    },
    isPaused: function () {
      return STATUSES.PAUSED === this.status;
    },
    isPlaying: function () {
      return STATUSES.PLAYING === this.status;
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
        this.$store.commit('setTimePeriod', 'short');
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
    /** TODO function to play currently selected track */
    playTrack (index) {
      var link = this.$store.getters.getTopTracks.items[index].preview_url;
      var audio = new Audio(link)
      audio.play();
    },
    loadTrack (index) {
      if (this.audioElement) this.audioElement.pause();
      if (this.activeTrack === index) {
        this.activeTrack = -1;
        return;
      }
      this.audioElement = new Audio(this.$store.getters.getTopTracks.items[index].preview_url);
      this.status = STATUSES.STOPPED;
      this.activeTrack = index;
      this.play();
    },
    play () {
      this.status = STATUSES.PLAYING;
      this.audioElement.play();
    },
    pause () {
      this.status = STATUSES.PAUSED;
      this.audioElement.pause();
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
</style>
