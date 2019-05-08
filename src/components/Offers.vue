<template>
  <v-flex xs12>
    <v-card>
      <h1>{{this.offer.title}}</h1>
      <span>Dept: {{this.offer.dept}} to: {{this.offer.to}}</span>
      <p>{{this.offer.price}} {{this.offer.curr}}</p>
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
}
</script>

<style>

</style>
