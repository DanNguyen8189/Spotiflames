import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    topArtistsShort: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setTopArtistsShort (state, artists) {
      state.topArtistsShort = artists;
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getTopArtistsShort (state) {
      return state.topArtistsShort;
    }
  }
  /* modules: {
    HelloWorld
  }, */
});
