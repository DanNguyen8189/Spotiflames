import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import SpotifyLogin from "@/components/SpotifyLogin";

Vue.use(Router);

export default new Router({
  //TODO mode
  //mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: HelloWorld
    },
    {
      path: "/spotifylogin",
      name: "SpotifyLogin",
      component: SpotifyLogin
    }
  ]
});
