<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg"></v-img>
      </v-flex>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs12>
            <v-card>
              <v-card-title class="blue white--text">
                <v-menu right height="60px">
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="(item, i) in menu" :key="i">
                      <router-link :to="item.to">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </router-link>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <p class="headline text-xs-center mb-0">Home</p>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-flex xs12 grid-list-md text-xs-center>
                <v-layout row class="text-center">
                  <v-text-field prepend-icon="search" v-model="flight" label="your destination"></v-text-field>
                  <v-btn class="mt-3" @click="search">Search</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs12 class="text-justify mr-2 ml-2">
                <p>
                  In
                  <strong>LandAway</strong>
                  you will find the best flights! The best companies trust us to offer you the best prices in the market.
                </p>
                <p>
                  Thank you for choosing
                  <strong>LandAway</strong>
                </p>
              </v-flex>
              <v-flex xs12>
                <p >See our clients most popular choices:</p>
              </v-flex>
              <v-flex xs12 v-for="(image,index) in offers" :key="image.to">
                <router-link :to="`/flights/${image.to.toLowerCase()}`">
                <v-card>
                  <span class="my-span">{{image.to}}</span>
                  <v-img
                    :src="image.src"
                  >
                  </v-img>
                </v-card>
                </router-link>
              </v-flex>
              <!-- <v-flex xs12 v-if="offers2">
                <h2>The last offers we found</h2>
                <offers v-for="(offer, index) in offers2" :key="offer.flyTo" :offer="offer"></offers>
              </v-flex>-->
              <!-- <v-btn @click="getLocation">as</v-btn>
              <v-flex v-for="location in locations" :key="location">
                <p>{{location}}</p>
              </v-flex> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway By Oscar Urgelles Marsal</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Offers from "../components/Offers.vue";

export default {
  data() {
    return {
      menu: [
        { title: "Flights", to: "/flights/ " },
        { title: "My Flights", to: "/myflights" },
        { title: "Profile", to: "/profile" }
      ],
      flight: "",
      images: [],
      offers: [
        { src: "./ita.jpg", to: "Roma" },
        { src: "./svq.jpg", to: "Sevilla" },
        { src: "./tokio.jpg", to: "Tokio" },
        { src: "./mad.jpg", to: "Madrid" }
      ],
      lat: 0,
      lon: 0
    }
  },
  methods: {
    search() {
      if (this.flight) {
        this.$router.push(`/flights/${this.flight}`);
      }
    },
    // getLocation() {
    //   if (navigator.geolocation) {
    //     console.log("yee");
    //     navigator.geolocation.getCurrentPosition(this.showPosition);
    //   }
    //   else{
    //     console.log("yaa");
    //   }
    // },
    // showPosition(position) {
    //   this.lat=position.coords.latitude;
    //   this.lon=position.coords.longitude;
    // }
    // displayOffers(){
    //   this.displayoffers=!this.displayoffers;
    // },
    // mySort(array, string) {
    //   array.sort(function(a, b) {
    //     if (a[string] > b[string]) {
    //       return 1;
    //     }
    //     if (a[string] < b[string]) {
    //       return -1;
    //     }
    //     // a must be equal to b
    //     return 0;
    //   });
    //   return array;
    // }
  },
  computed: {
      // locations() {
      //   return this.$store.getters.getLocations.map(element => {return element.name});
      // }
    // offers2 (){
    //   return this.$store.getters.getOffer;
    // }
  },
  components: {
    Offers
  },
  watch: {},
  created() {
      
      //  this.$store.dispatch("getLocations");
    // this.$store.dispatch("getOffer");
  }
};
</script>

<style>
.v-card__title.blue.white--text {
  padding: 0;
}
.container.grid-list-md.text-xs-center {
  background-color: #b2b2f1;
}

.text-justify {
  text-align: justify;
}

.my-span {
  font-weight: bold;
  text-align: center;
}
</style>
