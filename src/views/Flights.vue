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
<!-- Inputs -->
              <v-container fluid>
                <v-layout row class="text-center" align-items-center justify-content-center>
                  <v-flex xs3>
                    <p class="mb-0">One Way</p>
                  </v-flex>
                  <v-flex xs3>
                    <v-switch v-model="oneWay"></v-switch>
                  </v-flex>
                  <v-flex xs5 class="mt-3">
                    <v-expansion-panel xs12>
                      <v-expansion-panel-content md12>
                        <template v-slot:header>
                          <div>Class &#38; Travelers</div>
                        </template>
                        <v-flex xs12 d-flex>
                          <v-select :items="clases" v-model="chosenClass" item-text="name" :value="clases.value" label="Class Travelers" box></v-select>
                        </v-flex>
                        <v-flex xs12 class="mr-2">
                            <p>Childrens:</p>
                        </v-flex>
                        <v-flex xs12 class="mr-2">
                          <v-select menu-props="right" v-model="children" :items="numbers"></v-select>
                        </v-flex>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-flex>
                  <v-flex xs3>
                    <p class="mb-0">Adults</p>
                  </v-flex>
                  <v-flex xs3 class="mr-2">
                    <v-select menu-props="right" v-model="adults" :items="numbers"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid>
                <v-layout row class="text-center mr-3" align-items-center justify-content-center>
                  <v-flex xs2 md2 class="mt-3">
                    <p class="mb-0 mt-2">From</p>
                  </v-flex>
                  <v-flex xs4 md4>
                    <v-text-field v-model="from"></v-text-field>
                  </v-flex>
                  <v-flex xs2 md2 class="mt-3 mb-0">
                    <p class="mb-0 mt-2">To</p>
                  </v-flex>
                  <v-flex xs4 md4>
                    <v-text-field v-model="to"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row class="text-center mr-3" align-items-center justify-content-center>
                  <v-flex xs6 md6>
                    <v-container grid-list-md class="ml-3">
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="departDate"
                                label="Depart"
                                prepend-icon="flight_takeoff"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
                          </v-menu>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-flex v-if="!oneWay" xs6 md6>
                    <v-container grid-list-md class="ml-3">
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="returnDate"
                                label="Return"
                                prepend-icon="flight_land"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date2"
                              :allowed-dates="allowedDates"
                              no-title
                              @input="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-container>
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
      from: "Barcelona",
      to: this.dest,
      menu: [
        { title: "Home", to: "/home" },
        { title: "My Flights", to: "/myflights" },
        { title: "Profile", to: "/profile" }
      ],
      clases: [{name:"Low cost",value:"lcc"},{name:"Legacy carriers",value:"lc"}],
      oneWay: false,
      adults: 1,
      children: 0,
      chosenClass:'lcc',
      numbers: [0 ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      date: new Date().toISOString().substr(0, 10),
      date2: new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false
    };
  },
  methods: {
    allowedDates(val) {
      return new Date(val) >= new Date(this.date);
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");

      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }
  },
  computed: {
    departDate() {
      return this.formatDate(this.date);
    },
    returnDate() {
      return this.formatDate(this.date2);
    }
  },
  watch: {}
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

.container.ml-3.grid-list-md {
  padding: 0px;
}

.container.fluid {
  padding: 2px;
}
.mh40 {
  max-height: 40px;
}
.v-input.v-text-field.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light {
  margin-right: 10px;
}
</style>
