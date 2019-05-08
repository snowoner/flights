<template>
  <v-flex xs12 row>
    <v-card >
      <h1 class="mycard">{{offer.title}}</h1>
      <span >{{offer.to}} {{offer.date}}   </span> 
      <v-btn @click="bookOffer(offer.id)">{{offer.price}} {{offer.curr}}</v-btn>
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
      console.log("You are booking "+id+ " offer");
    }
  },
}
</script>

<style>
.mycard {
    background-color:rgb(241, 170, 89)
}
</style>
