import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import SpotifyLogin from "@/components/SpotifyLogin";
import Profile from "@/components/Profile";

Vue.use(Router);
// TODO change isAuthenticated
// const isAuthenticated = false;
const router = new Router({
  // TODO mode
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: HelloWorld
      // redirect: "/spotifylogin"
      // beforeEnter: checkAuth()
    },
    {
      path: "/spotifylogin",
      name: "SpotifyLogin",
      component: SpotifyLogin
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    }
  ]
});

/**
 * Route guard
 */
router.beforeEach((to, from, next) => {
  if (to.fullPath === "/") {
    return next("/spotifylogin");
  } else {
    next();
  }
});
export default router;
