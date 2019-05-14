import Vue from "vue";
import "./plugins/vuetify";
import firebase from "firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

let app = "";

const config = {
  apiKey: "AIzaSyBMXLBVjShc7gDMokiDkbElq6ijZ7epJoQ",
  authDomain: "landaway-2a000.firebaseapp.com",
  databaseURL: "https://landaway-2a000.firebaseio.com",
  projectId: "landaway-2a000",
  storageBucket: "landaway-2a000.appspot.com",
  messagingSenderId: "265669687650",
  appId: "1:265669687650:web:5296f3827aa95c70"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
