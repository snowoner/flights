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
                <p class="headline text-xs-center mb-0">My Flights</p>
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
              <v-container fluid v-if="user!=null">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-btn @click="contador++">click me!</v-btn><span>{{this.contador}}</span>
                  </v-flex>
                  <v-flex xs12 v-if="dbFlights">
                    <Flight
                      v-for="(flight, index) in dbFlights"
                      :key="index"
                      :flight="flight.flight.flight"
                      :oneWay="flight.flight.flight.hasOwnProperty('return_duration')?false:true"
                      :id="flight.id"
                    ></Flight>
                  </v-flex>
                </v-layout>
                <v-flex v-if="!dbFlights||dbFlights.length==0">
                  <v-card>
                    <v-card-text>
                    
                     {{user.user.displayName?user.user.displayName+" you":""||" You "}} don't have any flights yet!
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-container>
              <v-container v-if="user==null">
                <v-flex>
                  <v-card>
                    <v-card-text>
                      Only registered users can see their flights
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn to="/login">Login</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
       <v-flex xs12 class="separated100">
        <strong>LandAway made with Love &#128147;</strong>
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
        { title: "Flights", to: "/flights/ " }
      ],
      contador:0
    };
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    selectFlight() {  //esto se va a la puta
      return this.$store.getters.getSelectFlight;
    },
    dbFlights(){
      return this.$store.getters.getDbFlights;
    }
  },
  created() {
    this.$store.dispatch("getDbFlights");
  },
  components: {
    Flight
  }
};
</script>

<style>
.separated100 {
  margin-top: 100px;
}
</style>
