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
              <v-container fluid>
                <v-layout row class="text-center" align-items-center justify-content-center>
                  <v-flex xs3 >
                     <p>One Way</p>
                  </v-flex>
                  <v-flex xs3>
                    <v-switch v-model="oneWay"></v-switch>
                  </v-flex>
                  <v-flex xs3>
                    <p>Adults</p>
                  </v-flex>
                  <v-flex xs3>
                    <v-select menu-props="right" v-model="adults" :items="numbers"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-flex xs12>
               
              </v-flex>
              <v-flex xs12></v-flex>
              <v-flex xs12></v-flex>
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
  props: ["dest"],
  data() {
    return {
      menu: [
        { title: "Home", to: "/home" },
        { title: "My Flights", to: "/myflights" },
        { title: "Profile", to: "/profile" }
      ],
      oneWay: true,
      adults: 1,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }
};
</script>


<style>
.flex.xs3 {
    display: flex;
    justify-content: center;
    align-items: center;
}
.container.grid-list-md.text-xs-center {
  background-color: #b2b2f1;
}
</style>
