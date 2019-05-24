import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Flights from "./views/Flights.vue";
import Myflights from "./views/Myflights.vue";
import Forgot from "./views/Forgot.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import AdminChat from "./views/AdminChat.vue";
import firebase from "firebase";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "home",
      component: Home
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
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/flights/:dest",
      name: "flights",
      component: Flights,
      props: true
    },
    {
      path: "/myflights",
      name: "myflights",
      component: Myflights
      //   ,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/chat",
      name: "chat",
      component: AdminChat,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next("login");
  if (requiresAuth && currentUser) {
    if (currentUser.email == "oscar.urgelles@gmail.com") next();
    else next("home");
  } else next();
});

export default router;
