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
              </v-card-title>
              <v-flex v-if="this.dest!=' '" xs12 grid-list-md text-xs-center>
              <p> Your dest: {{this.dest}} </p>
              </v-flex>
              <v-flex xs12 class="text-justify">
              
              </v-flex>
           
              <v-flex xs12>
          
              </v-flex>
              <v-flex xs12>
 
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
export default {
  props:["dest"],
  data() {
    return {
      menu: [
        { title: "Home", to: "/home" },
        { title: "My Flights", to: "/myflights" },
        { title: "Profile", to: "/profile" }
      ],
    }
  },
}
</script>


<style>
.container.grid-list-md.text-xs-center {
    background-color:#b2b2f1;
}
</style>
