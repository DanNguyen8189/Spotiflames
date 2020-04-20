<template>
  <div class='topartists'>
  <h1>Top Tracks</h1>
    <div id = "top">
        <button v-on:click="changeTimePeriod('short')">Past Month</button>
        <button v-on:click="changeTimePeriod('medium')">Past 6 Months</button>
        <button v-on:click="changeTimePeriod('long')">All Time</button>
    </div>
    <template v-if="this.userTracksShort">
      <div v-for="n in getAmount()" :key="n" @click.prevent="playTrack(n-1)" class="list-item">
        <p class="track-number">{{n}}</p>
        <img :src=getImage(n-1)>
        <div class = "track-artist-text">
          <p class="track-name">{{ getTrackName(n-1) }}</p>
          <p class="artist-name">{{ getArtistName(n-1) }}</p>
        </div>
        <div v-if="getTrackURL(n-1) !== null" class="play-button-area triangle-right"
          @click.prevent="playTrack(n-1)">
        </div>
        <p v-else class="play-button-area preview-na">Preview N/A</p>
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
    /** function to get amount of tracks listed in this time period */
    getAmount () {
      return this.$store.getters.getTopTracks.total;
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
.topartists {
  max-width: 70em;
  margin: auto;
}
h1 {
  color: #ff741e;
}
#top {
  display: block;
}
.list-item {
  cursor: pointer; /* changes the cursor to the hand cursor on hover */
  background-color: #155479;
  margin: 1em 5%;
  height: 5em;
  -webkit-transition: background-color 0.5s;
  -moz-transition:    background-color 0.5s;
  -ms-transition:     background-color 0.5s;
  -o-transition:      background-color 0.5s;
  transition:         background-color 0.5s;
}
.list-item:hover {
  background-color: #e42c69af;
}
.list-item:hover .triangle-right {
  border-left: 35px solid orange;
}
.list-item:hover .track-number {
  color: orange;
}
.list-item .track-number {
  float: left;
  line-height: 3em;
  margin-left: 2%;
  color: #2f93c2;
  -webkit-transition: color 0.5s;
  -moz-transition:    color 0.5s;
  -ms-transition:     color 0.5s;
  -o-transition:      color 0.5s;
  transition:         color 0.5s;
}
.list-item img {
  border-radius: 50%;
  float: left;
  margin-left: 2%;
  margin-top: 0.5em;
}
.track-artist-text {
  display: inline-block;
  overflow: hidden;
  width: 40%;
}
.track-name {
  color: white;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; /* need this for text-overflow property to work */
}
.artist-name {
  color: orange;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.play-button-area {
  float: right;
}
.triangle-right {
	/* width: 0;
	height: 0; */
  margin: 1.1em 1em 1.1em 2em;
	border-top: 20px solid transparent;
	border-left: 35px solid #0a2b5c;
	border-bottom: 20px solid transparent;
  -webkit-transition: border-left 0.5s;
  -moz-transition:    border-left 0.5s;
  -ms-transition:     border-left 0.5s;
  -o-transition:      border-left 0.5s;
  transition:         border-left 0.5s;
}
.preview-na {
  width: 4em;
  margin: 1.4em 1em 0 0.6em;
  color: #2da9e2;
}
</style>
