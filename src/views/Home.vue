<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 class="white">
        <v-img class="elevation-5 "  max-height="80px" contain :src="require('../../public/logo_landaway_rectangular.jpg')"></v-img>
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
                      <router-link class="myMenu" :to="item.to">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </router-link>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <p class="headline text-xs-center mb-0">Home</p>
                <v-spacer></v-spacer>
                <router-link to="/profile">
                  <v-avatar class="mr-3" size="30px" color="grey lighten-4">
                  <img
                    :src="user?user.user.photoURL||require('../../public/nouser.png'):require('../../public/nouser.png')"
                    alt="avatar"
                  >
                </v-avatar>
                </router-link>
              </v-card-title>
              <v-flex xs12 grid-list-md text-xs-center>
                <v-layout row class="text-center">
                  <v-autocomplete
                      v-model="flight"
                      :items="cities"
                      hide-no-data
                      hide-selected
                      :item-text="citiAndAirport"
                      clearable
                      item-value="iata"
                      label="Your destination"
                      prepend-icon="search"
                      return-object
                      class="caption"
                    ></v-autocomplete>
                  <v-btn class="mt-3" @click="search">Search</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs12 class="text-justify mr-2 ml-2">
                <p><span v-if="user!=null">Hi  </span> <strong v-if="user!=null" >{{user.user.displayName}}.</strong><p>
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
              <v-flex xs12 v-for="image in offers" :key="image.to">
                <router-link :to="`/flights/${image.iata}`">
                <v-card>
                  <span class="my-span">{{image.to}}</span>
                  <v-img
                    :src="image.src"
                  >
                  </v-img>
                </v-card>
                </router-link>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway made with Love &#128147; By <a href="https://www.linkedin.com/in/oscarurgelles/">Oscar Urgelles</a></strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<!--

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');

// Max number of lines of the chat history.
const MAX_LOG_COUNT = 5;

// Removes siblings of the node that element that triggered the function if there are more than MAX_LOG_COUNT.
// In this example we'll keep the max number of chat message history to MAX_LOG_COUNT.
exports.truncate = functions.database.ref('/chat/{messageid}').onWrite(async (change) => {
  const parentRef = change.after.ref.parent;
  const snapshot = await parentRef.once('value');
  if (snapshot.numChildren() >= MAX_LOG_COUNT) {
    let childCount = 0;
    const updates = {};
    snapshot.forEach((child) => {
      if (++childCount <= snapshot.numChildren() - MAX_LOG_COUNT) {
        updates[child.key] = null;
      }
    });
    // Update the parent. This effectively removes the extra children.
    return parentRef.update(updates);
  }
  return null;
});

-->
<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      sheet: false,
      menu: [
        { title: "Flights", to: "/flights/ " },
        { title: "My Flights", to: "/myflights" }
      ],
      flight: null,
      images: [],
      offers: [
        { src: "./ita.jpg", to: "Roma", iata:"FCO" },
        { src: "./svq.jpg", to: "Sevilla", iata: "SVQ"},
        { src: "./tokio.jpg", to: "Tokio", iata: "HND"},
        { src: "./mad.jpg", to: "Madrid", iata: "MAD"}
      ],
      lat: 0,
      lon: 0
    }
  },
  methods: {
    citiAndAirport: item => item.city + "-" + item.name,
    search() {
      if (this.flight) {
        this.$router.push(`/flights/${this.flight.iata}`);
      }
    },
    // logout() {
    //   firebase.auth().signOut().then(()=>{
    //     this.$router.replace("login");
    //   })
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
    cities() {
      let citiesReturn = [];
      for (const key in this.destinations) {
        if (this.destinations.hasOwnProperty(key)) {
          const element = this.destinations[key];
          citiesReturn.push({
            city: element.city,
            iata: element.iata,
            name: element.name
          });
        }
      }
      return citiesReturn;
    },
    user(){
      return this.$store.getters.getUser;
    },
    destinations(){
      return this.$store.getters.getLocations;
    }
  },
  watch: {},
  created() {
      
     this.$store.dispatch("getLocations");
    // this.$store.dispatch("getOffer");
  }
};
</script>

<style>
.myMenu{
  text-decoration: none;
}
.v-card__title.blue.white--text {
  padding: 0;
}
.container.grid-list-md.text-xs-center {
  background-color: #b2b2f1;
}
.none{
  text-decoration: none;
}
.text-justify {
  text-align: justify;
}
.white{
  background-color: white;
}
.my-span {
  font-weight: bold;
  text-align: center;
}
</style>
