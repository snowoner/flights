import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    offers: [],
    url:
      "https://api.skypicker.com/flights?flyFrom=BCN&to=SVQ&dateFrom=09/05/2019&dateTo=12/05/2019&partner=picky"
  },
  mutations: {
    setOffers(state, data) {
      state.offers = data;
    }
  },
  actions: {
    getOffers(context) {
      fetch(context.state.url)
        .then(data => data.json())
        .then(data => {
          context.commit("setOffers", data.data);
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  getters: {
    getOffers(state) {
      return state.offers;
    }
  }
});
