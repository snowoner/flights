<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="../logo.jpg"></v-img>
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
                <p class="headline text-xs-center mb-0">Flights</p>
                <v-spacer></v-spacer>
                <router-link to="/profile" class="none">
                  <v-icon left large>account_circle</v-icon>
                </router-link>
              </v-card-title>
              <v-container fluid v-if="user!=null">
                <v-flex>
                  <Flight v-for="(flight, index) in selectFlight" :key="index" :flight="flight" :oneWay="flight.hasOwnProperty('return_duration')?false:true"></Flight>
                </v-flex>
              </v-container>
              <v-container v-else>
                <v-flex>
                  <v-card>
                    <v-card-text>
                      You don't have any flight yet!
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Flight from "../components/Flight.vue";

export default {
  data() {
    return {
      menu: [
        { title: "Home", to: "/home" },
        { title: "Flights", to: "/flights/ " },
        { title: "Profile", to: "/profile" }
      ]
    };
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    selectFlight() {
      return this.$store.getters.getSelectFlight;
    }
  },
  components: {
    Flight
  }
};
</script>

<style>
</style>
