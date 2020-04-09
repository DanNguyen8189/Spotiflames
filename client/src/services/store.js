import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    topArtistsShort: null,
    topArtistsMedium: null,
    topArtistsLong: null,
    topTracksShort: null,
    topTracksMedium: null,
    topTracksLong: null
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
    setUserArtistsTracks (state, data) {
      state.user = data.user;
      state.topArtistsShort = data.topArtistsShort;
      state.topArtistsMedium = data.topArtistsMedium;
      state.topArtistsLong = data.topArtistsLong;
      state.topTracksShort = data.topTracksShort;
      state.topTracksMedium = data.topTracksMedium;
      state.topTracksLong = data.topTracksLong;
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
    }
  }
  /* modules: {
    HelloWorld
  }, */
});
