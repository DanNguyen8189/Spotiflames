import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  }
  /* modules: {
    HelloWorld
  }, */
});
