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
    <v-flex>
      <v-btn :href="flight.deep_link">{{flight.price}}€</v-btn>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  props: ["flight","oneWay"],
  data() {
    return {};
  },
  methods: {
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
    }
  }
};
</script>

<style>
</style>
