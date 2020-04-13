<template>
    <div class='topartists'>
      <template v-if="this.userArtistsShort">
        <h1>Top Artists</h1>
      <!--<img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">-->
        <img :src="this.userArtistsShort.items[0].images[2].url" alt="artist_picture">
        <div v-for="n in 10" :key="n">
          <!--<img v-bind:src="`this.userArtistsShort.items[0].images[2].url`">-->
          <!--<img src="https://i.scdn.co/image/15616ceb5c8c7e88aa07cb2f406a2b722a36fcd0">-->
          <!--<img :src="this.userArtistsShort.items[0].images[2].url" alt="artist_picture">-->
          <!--<img :src="this.$store.state.topArtistsShort.items[0].images[2].url" alt="artist_picture">-->
        </div>
      </template>
      <template v-else>
        <h1>topartists not found</h1>
      </template>
    </div>
</template>

<script>
import { getTopArtists } from "../services/spotifyApi";
export default {
  name: 'TopArtists',
  data () {
    return {
      msg: 'Top artists page'
    }
  },
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
    }
  },
  created () {
    this.getTopArtists2();
  }
}
</script>

<style scoped>
</style>
