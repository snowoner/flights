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
                <router-link to="/profile">
                  <v-avatar class="mr-3" size="30px" color="grey lighten-4">
                  <img
                    :src="user?user.user.photoURL||require('../../public/nouser.png'):require('../../public/nouser.png')"
                    alt="avatar"
                  >
                </v-avatar>
                </router-link>
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
                  <v-flex xs5 class="mt-3 mr-3">
                    <v-menu xs6>
                      <v-btn class="small" slot="activator">Class &#38; Travelers</v-btn>
                      <v-list>
                        <v-flex xs12 @click.stop>
                          <v-select
                            class="ml-3 mr-3"
                            :items="clases"
                            v-model="chosenClass"
                            item-text="name"
                            :value="clases.value"
                            label="Class Travelers"
                            box
                            chips
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 @click.stop>
                          <v-select
                            class="ml-3 mr-3"
                            menu-props="right"
                            chips
                            label="Childrens"
                            v-model="children"
                            :items="numbersC"
                          ></v-select>
                        </v-flex>
                      </v-list>
                    </v-menu>
                  </v-flex>
                  <v-flex xs3>
                    <p class="mb-0">Adults</p>
                  </v-flex>
                  <v-flex xs3 class="mr-2">
                    <v-select menu-props="right" chips v-model="adults" :items="numbers"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid>
                <v-layout
                  row
                  class="text-center mr-3 ml-3"
                  align-items-center
                  justify-content-center
                >
                  <v-flex xs12 md12>
                    <v-autocomplete
                      v-model="from"
                      :items="cities"
                      hide-no-data
                      hide-selected
                      :item-text="citiAndAirport"
                      item-value="iata"
                      label="From"
                      clearable
                      prepend-icon="flight_takeoff"
                      return-object
                      class="caption"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
                <v-layout
                  row
                  class="text-center ml-3 mr-3"
                  align-items-center
                  justify-content-center
                >
                  <v-flex xs12 md12>
                    <v-autocomplete
                      v-model="to"
                      :items="cities"
                      hide-no-data
                      hide-selected
                      :item-text="citiAndAirport"
                      item-value="iata"
                      label="To"
                      clearable
                      prepend-icon="flight_land"
                      return-object
                      class="caption"
                    ></v-autocomplete>
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
                            max-width="300px"
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
                            <v-date-picker
                              v-model="date"
                              :allowed-dates="allowedDates2"
                              @change="checkDate2"
                              no-title
                              @input="menu1 = false"
                            ></v-date-picker>
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
              <v-container fluid>
                <v-layout
                  row
                  class="text-center mr-3 ml-3"
                  align-items-center
                  justify-content-center
                >
                  <v-flex xs12 md12>
                    <div>
                      <v-btn color="success" @click="search" dark large round>
                        <v-icon>search</v-icon>Search your Flight
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex v-if="loading" xs12>
                    <v-card>
                      <v-progress-linear :indeterminate="true"></v-progress-linear>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-flex>
                  <Flight
                    v-for="(flight) in results"
                    :key="flight.id"
                    :flight="flight"
                    :oneWay="oneWay"
                  ></Flight>
                  <v-flex v-if="numResults==0 && !loading">
                    <v-card>
                      <v-card-text>
                        <h3>Sorry no flights available with that criteria</h3>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-flex>
              </v-container>
              <!--fin container-->
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12></v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway made with Love &lt;3 </strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Flight from "../components/Flight.vue";

export default {
  props: ["dest"],
  data() {
    return {
      from: {
        iata: "BCN"
      },
      to: {
        iata: this.dest
      },

      // to: {city:this.dest, iata:null, name:this.dest},
      menu: [
        { title: "Home", to: "/home" },
        { title: "My Flights", to: "/myflights" }
      ],
      clases: [
        { name: "Low cost", value: "lcc" },
        { name: "Legacy carriers", value: "lc" }
      ],
      oneWay: false,

  

      adults: 1,
      children: 0,
      chosenClass: "lcc",
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      numbersC: [0, 1, 2, 3, 4, 5],
      date: new Date().toISOString().substr(0, 10),
      date2: new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      first_search: null
    };
  },
  components: {
    Flight
  },
  methods: {
    //  getUserLocation() {
    //       if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(this.showPosition);
    //       }
    //     },
    //     showPosition(position) {
    //       this.lat=position.coords.latitude;
    //       this.lon=position.coords.longitude;
    //     },
    // convert(val) {
    //   // Convert timestamp to milliseconds
    //   let date = new Date(val * 1000);
    //   let convdataTime = `${date.getHours()}:${
    //     date
    //       .getMinutes()
    //       .toString()
    //       .substr(-2) == 0
    //       ? "00"
    //       : date
    //           .getMinutes()
    //           .toString()
    //           .substr(-2)
    //   }`;
    //   return convdataTime;
    // },
    // convertDay(val) {
    //   // Convert timestamp to milliseconds
    //   let date = new Date(val * 1000);
    //   var months_arr = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec"
    //   ];

    //   // Month
    //   var month = months_arr[date.getMonth()];

    //   // Day
    //   var day = date.getDate();

    //   let convdataTime = `${day}-${month}`;
    //   return convdataTime;
    // },
    citiAndAirport: item => item.city + "-" + item.name,
    allowedDates(val) {
      return new Date(val) >= new Date(this.date);
    },
    allowedDates2(val) {
      return new Date(val) >= new Date().setDate(new Date().getDate() - 1);
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");

      return `${day}/${month}/${year}`;
    },
    // checkFrom(){
    //     if(this.to.iata) {
    //       if(this.to.iata==this.from.iata){
    //         this.to.iata==null;
    //       }
    //     }
    // },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    checkDate2() {
      if (this.date > this.date2) {
        this.date2 = this.date;
      }
    },
    search() {
      let datos = {
        from: this.from.iata,
        to: this.to.iata,
        departDate: this.departDate,
        returnDate: this.returnDate,
        oneWay: this.oneWay,
        adults: this.adults,
        children: this.children,
        type: this.chosenClass
      };
      this.$store.dispatch("getFlights", datos);
      this.first_search = true;
    }
  },
  computed: {
    numResults() {
      return this.$store.getters.getNumResults;
    },
    user(){
      return this.$store.getters.getUser;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
    results() {
      return this.$store.getters.getFlights;
    },
    selectFlight() {
      return this.$store.getters.getSelectFlight;
    },
    departDate() {
      return this.formatDate(this.date);
    },
    returnDate() {
      return this.formatDate(this.date2);
    },
    locations() {
      return this.$store.getters.getLocations;
    },
    cities() {
      let citiesReturn = [];
      for (const key in this.locations) {
        if (this.locations.hasOwnProperty(key)) {
          const element = this.locations[key];
          citiesReturn.push({
            city: element.city,
            iata: element.iata,
            name: element.name,
            lat: element.latitude,
            lon: element.longitude
          });
        }
      }
      return citiesReturn;
    }
  },
  watch: {
    // to: {
    //   handler: "checkFrom",
    //   immediate: true
    // }
  },
  created() {
    // this.getUserLocation();
    this.$store.dispatch("getLocations");
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
.none{
  text-decoration: none;
}
.w300 {
  width: 300px;
}
.container.ml-3.grid-list-md {
  padding: 0px;
}

.small {
  font-size: 10px;
}

.v-list.theme--light {
  max-width: 300px;
}

.p0 {
  padding: 0px;
}
input[type="text"] {
  max-width: 300px;
}
a.v-list__tile.v-list__tile--link.theme--light {
    max-width: 300px;
    width: fit-content;
}

.separated100 {
  margin-top: 100px;
}
button.v-btn.theme--light {
  max-width: 40px;
  white-space: wrap;
  text-transform: none;
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
.v-expansion-panel__header {
  padding: 2px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.centerCol {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
