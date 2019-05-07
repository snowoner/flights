import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Flights from "./views/Flights.vue";
import Myflights from "./views/Myflights.vue";
import Forgot from "./views/Forgot.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/forgot",
      name: "forgot",
      component: Forgot
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/flights",
      name: "flights",
      component: Flights
    },
    {
      path: "/myflights",
      name: "myflights",
      component: Myflights
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
  ]
});
