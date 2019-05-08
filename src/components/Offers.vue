<template>
  <!-- <v-flex xs12 row>
    <v-card >
      <h1 class="mycard">{{offer.cityFrom}} To {{offer.cityTo}}</h1>
      <span >{{offer.fly_duration}}   oppered by: {{offer.airlines[0]||"--"}}</span> 
      <spacer></spacer>
      <v-btn  @click="bookOffer(offer.deep_link)">{{offer.price}}€</v-btn>
    </v-card>
  </v-flex> -->
  <v-flex xs12>
    <v-card>
      
    </v-card>
  </v-flex>
</template>
<script>
export default {
  props:["offer"],
  data() {
    return {
      
    }
  },
  methods: {
    bookOffer(id){
      window.open(id);
    }
  },
}
</script>

<style>

.mycard {
    background-color:rgb(241, 170, 89)
}
</style>
