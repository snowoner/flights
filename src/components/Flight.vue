<template>
  <v-card class="centerCol">
    <v-flex v-for="(route, index) in flight.route" :key="route.id" class="centerCol" xs12>
    
      <v-flex class="center" xs12>
        <span class="mr-1">{{convertDay(route.dTimeUTC)}}</span>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <strong v-on="on">{{route.flyFrom}}</strong>
          </template>
          <span>{{route.cityFrom}}</span>
        </v-tooltip>

        <span class="ml-1 mr-1">( {{convert(route.dTimeUTC)}} )</span>
        <v-icon>arrow_right</v-icon>
        <span class="ml-1 mr-1">( {{convert(route.aTimeUTC)}} )</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <strong v-on="on">{{route.flyTo}}</strong>
          </template>
          <span>{{route.cityTo}}</span>
        </v-tooltip>

        <v-img
          class="ml-1"
          width="20px"
          height="20px"
          :src="`https://images.kiwi.com/airlines/128/${route.airline}.png`"
        ></v-img>
      </v-flex>
      
    </v-flex>
    <v-flex xs12 class="center w300">
      <v-card-text class="ml-1 p0">Fly:</v-card-text>
      <v-card-text class="ml-1 mr-1 p0">{{flight.fly_duration}}</v-card-text>
      <v-card-text v-if="!this.oneWay" class="ml-1 mr-1 p0">Return:</v-card-text>
      <v-card-text v-if="!this.oneWay" class="ml-1 p0">{{flight.return_duration}}</v-card-text>
    </v-flex>
    <v-flex v-if="user!=null">
      <v-btn v-if="this.$router.history.current.name=='myflights'" @click="del" >Cancel</v-btn>
      <v-btn @click="book">{{flight.price}}€</v-btn>
    </v-flex>
    <v-flex v-if="user==null">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
         <v-btn v-on="on">{{flight.price}}€</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Not registered yet?</v-card-title>
          <v-card-text>You have to be registered to purchase this flight</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dissmiss">I will do it later</v-btn>
             <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="proceed">Proceed to register</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    </v-flex>
  </v-card>
   
</template>

<script>
export default {
  
  props: ["flight", "oneWay"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    del(){
      this.$store.commit("delSelectFlight", this.flight);
      this.$router.push("/myflights");
      
    },
    book() {
      if(this.$router.history.current.name=="myflights") {
        window.open(this.flight.deep_link);
      }
      else {
        
        this.$store.commit("setSelectFlight", this.flight);
       this.$router.replace("/myflights");
      }
      
      // window.open(deep_link);
    },
    convert(val) {
      // Convert timestamp to milliseconds
      let date = new Date(val * 1000);
      let convdataTime = `${date.getHours()}:${
        date
          .getMinutes()
          .toString()
          .substr(-2) == 0
          ? "00"
          : date
              .getMinutes()
              .toString()
              .substr(-2)
      }`;
      return convdataTime;
    },
   
    proceed(){
      this.dialog = false;
   
      this.$store.commit("setSelectFlight", this.flight);
      this.$router.replace("/login");
    },
    dissmiss(){
      this.dialog = false;
      this.$store.commit("setSelectFlight", null);
  
    },
    convertDay(val) {
      // Convert timestamp to milliseconds
      let date = new Date(val * 1000);
      var months_arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      // Month
      var month = months_arr[date.getMonth()];

      // Day
      var day = date.getDate();

      let convdataTime = `${day}-${month}`;
      return convdataTime;
    },

  },
  computed: {
    user(){
      return this.$store.getters.getUser;
    }
  },
};
</script>

<style>
</style>
