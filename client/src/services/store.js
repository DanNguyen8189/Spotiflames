import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null, // used by Home.vue to store basic user information
    timePeriod: null, // set by TopArtists.vue and TopTracks.vue to determine which set of artists to display
    // The getters use this to determine which set of artists and tracks to return
    // all of the below are in JSON format.
    topArtistsShort: null, // list of top artists from the past month
    topArtistsMedium: null, // list of top artists from the past 6 months
    topArtistsLong: null, // list of top artists all time
    topTracksShort: null, // list of top tracks from the past month
    topTracksMedium: null, // list of top tracks from the past 6 months
    topTracksLong: null // list of top tracks all time
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setTopArtistsShort (state, artists) {
      state.topArtistsShort = artists;
    },
    setTopArtistsMedium (state, artists) {
      state.topArtistsMedium = artists;
    },
    setTopArtistsLong (state, artists) {
      state.topArtistsLong = artists;
    },
    setTopTracksShort (state, tracks) {
      state.topTracksShort = tracks;
    },
    setTopTracksMedium (state, tracks) {
      state.topTracksMedium = tracks;
    },
    setTopTracksLong (state, tracks) {
      state.topTracksLong = tracks;
    },
    setTopArtists (state, data) {
      state.topArtistsShort = data.topArtistsShort;
      state.topArtistsMedium = data.topArtistsMedium;
      state.topArtistsLong = data.topArtistsLong;
    },
    setTopTracks (state, data) {
      state.topTracksShort = data.topTracksShort;
      state.topTracksMedium = data.topTracksMedium;
      state.topTracksLong = data.topTracksLong;
    },
    // set the time period - the options for the data are 'short', 'medium', and 'long'
    setTimePeriod (state, data) {
      console.log("time period setter:" + data);
      state.timePeriod = data;
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getTopArtistsShort (state) {
      return state.topArtistsShort;
    },
    getTopArtistsMedium (state) {
      return state.topArtistsMedium;
    },
    getTopArtistsLong (state) {
      return state.topArtistsLong;
    },
    getTopTracksShort (state) {
      return state.topTracksShort;
    },
    getTopTracksMedium (state) {
      return state.topTracksMedium;
    },
    getTopTracksLong (state) {
      return state.topTracksLong;
    },
    // return the top artists list based in the timePeriod state
    getTopArtists (state) {
      switch (state.timePeriod) {
        case 'short':
          console.log("returning short artists");
          return state.topArtistsShort;
        case 'medium':
          return state.topArtistsMedium;
        case 'long':
          return state.topArtistsLong;
        default:
          console.log("defaulting");
          return state.topArtistsShort;
      }
    },
    // return the top tracks list based on the timePeriod state
    getTopTracks (state) {
      switch (state.timePeriod) {
        case 'short':
          console.log("returning short tracks");
          return state.topTracksShort;
        case 'medium':
          return state.topTracksMedium;
        case 'long':
          return state.topTracksLong;
        default:
          console.log("defaulting");
          return state.topTracksShort;
      }
    }
  }
  /* modules: {
    HelloWorld
  }, */
});
