import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // airports: [],
    // url:"https://api.skypicker.com/flights?flyFrom=BCN&to=SVQ&dateFrom=09/05/2019&dateTo=12/05/2019&partner=picky"
       },
  mutations: {
    // setAirports(state, data) {
    //   state.airports = data;
    // }
  },
  actions: {
    // getAirports(context) {
    //   fetch(context.state.url)
    //     .then(data => data.json())
    //     .then(data => {
    //       context.commit("setAirports", data);
    //     })
    //     .catch(error => {
    //       alert(error);
    //     });
    // }
  },
  getters: {
    // getAirports(state) {
    //   return state.airports;
    // }
  }
});
