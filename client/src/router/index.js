import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import SpotifyLogin from "@/components/SpotifyLogin";
import Profile from "@/components/Profile";
import { accessToken } from "@/services/spotifyApi";

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
 * Route guard, redirect all routes to login page if user isn't logged in
 * https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
router.beforeEach((to, from, next) => {
  // statement to prevent infinite redirecting to login page if entry was from login page
  if (to.fullPath === '/spotifylogin') {
    if (accessToken) {
      return next('/profile');
    } else return next();
  }
  if (!accessToken) {
    return next("/spotifylogin");
  } else return next();
});
export default router;
