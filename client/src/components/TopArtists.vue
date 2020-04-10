<template>
    <div class='topartists'>
      <template v-if="this.userArtistsShort">
        <h1>Top Artists</h1>
      <!--<img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">-->
        <!--<img :src="this.userArtistsShort.images[0].url" alt="profile_picture" class="profile_pic">-->
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
        console.log(this.$store.state.topArtistsShort.items);
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
