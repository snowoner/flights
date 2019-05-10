import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    // urlLocation:
    //   "https://api.skypicker.com/locations?type=radius&&lat=41.3714289&lon=2.1352135&radius=250&locale=en-US&location_types=airport&limit=20&sort=name&active_only=true",
    urlLocation:
      "https://raw.githubusercontent.com/ram-nadella/airport-codes/master/airports.json",
    airports: []
    
    // offer: [],
    // offers: [],
    // urls: [
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=SVQ&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky",
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=TNR&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky",
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=NRT&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky",
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=OKA&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky",
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=SGF&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky",
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=SCL&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky",
    //   "https://api.skypicker.com/flights?flyFrom=BCN&to=MEX&dateFrom=09/05/2019&dateTo=12/05/2019&limit=1&sort=duration&partner=picky"
    // ],
    // url: "https://api.skypicker.com/flights?fly_from=BCN&fly_to=SVQ&max_fly_duration=6&flight_type=oneway&adults=1&children=0&infants=0&partner=picky&curr=EUR&price_from=1&price_to=10000&vehicle_type=aircraft&limit=5&sort=price&asc=1"
  },
  mutations: {
    // setOffers(state, data) {
    //   state.offers.push(data);
    // },
    // setOffer(state, data) {
    //   state.offer = data;
    // }
    setLocations(state, data) {
      state.locations = data;
    }
    // setAirports(state, data) {
    //   state.airports = data;
    // }
  },
  actions: {
    // getOffer(context){
    //   fetch(context.state.url)
    //     .then(data => data.json())
    //     .then(data => {
    //       context.commit("setOffer", data.data);
    //     })
    //     .catch(error => {
    //       alert(error);
    //     });
    // },
    // getOffers(context) {
    //   context.state.urls.forEach(element => {
    //     fetch(element)
    //       .then(data => data.json())
    //       .then(data => {
    //         context.commit("setOffers", data.data);
    //       })
    //       .catch(error => {
    //         alert(error);
    //       });
    //   });
    // },
    getLocations(context) {
      fetch(context.state.urlLocation)
        .then(data => data.json())
        .then(data => {
          context.commit("setLocations", data);
        })
        .then(error => {
          console.log(error);
        });
    }
  },
  getters: {
    // getAirports(state) {
    //   return state.airports;
    // }
    getLocations(state) {
      return state.locations;
    }
    // getOffers(state) {
    //   return state.offers;
    // },
    // getOffer(state) {
    //   return state.offer;
    // }
  }
});
