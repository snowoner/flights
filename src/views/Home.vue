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
              <!-- <v-btn @click="getphotos">GetImagesfker</v-btn>
              <v-flex xs12>
                <v-carousel hide-delimiters>
              
                <router-link :to="`/flights/${flight}`"> 
                  <v-carousel-item v-for="(item,i) in this.images" :key="i" :src="item.urls.regular"></v-carousel-item>
                </router-link>
                </v-carousel>
              </v-flex> -->
              <v-flex xs12>
          
              </v-flex>
              <v-flex xs12 v-if="offers2">
                <h2>The last offers we found</h2>
                <offers v-for="(offer, index) in offers2" :key="offer.flyTo" :offer="offer"></offers>
              </v-flex>
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
    };
  },
  methods: {
    search() {
      if (this.flight) {
        this.$router.push(`/flights/${this.flight}`);
      }
    },
    displayOffers(){
      this.displayoffers=!this.displayoffers;
    },
    mySort(array, string) {
      array.sort(function(a, b) {
        if (a[string] > b[string]) {
          return 1;
        }
        if (a[string] < b[string]) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return array;
    }
  },
  computed: {
    offers2 (){
      return this.mySort(this.$store.getters.getOffers,"fly_duration").slice(0,20).filter(element =>{return element.price<=200});
    }
  },
  components: {
    Offers
  },
  watch: {

  },
  created() {
    this.$store.dispatch("getOffers");
  },

};
</script>

<style>
.v-card__title.blue.white--text {
  padding: 0;
}
.container.grid-list-md.text-xs-center {
    background-color:#b2b2f1;
}

.text-justify {
  text-align: justify;
}
</style>
