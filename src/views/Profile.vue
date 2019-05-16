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
                <p class="headline text-xs-center mb-0">Profile</p>
                <v-spacer></v-spacer>
                  
                <v-icon left large >account_circle</v-icon>
               
              </v-card-title>
              <v-flex xs12 grid-list-md text-xs-center>
                <v-layout row class="text-center">
                  
                
                </v-layout>
              </v-flex>
           
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <!-- <v-btn @click="logout">Logout</v-btn> -->
        <strong>LandAway made with Love &lt;3 </strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
       menu: [
        { title: "Flights", to: "/flights/ " },
        { title: "My Flights", to: "/myflights" },
        { title: "Profile", to: "/profile" }
      ],
    }
  },
  methods: {
    
  },
  computed: {
    
  },
}
</script>

<style>

.separated100 {
  margin-top: 100px;
}
</style>
