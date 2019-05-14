import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Flights from "./views/Flights.vue";
import Myflights from "./views/Myflights.vue";
import Forgot from "./views/Forgot.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import firebase from 'firebase';


Vue.use(Router);

const router= new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
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
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/flights/:dest",
      name: "flights",
      component: Flights,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/myflights",
      name: "myflights",
      component: Myflights,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
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
  else if (!requiresAuth && currentUser) next("home");
  else next();
});

export default router;
