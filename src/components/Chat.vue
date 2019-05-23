<template>
  <v-card-text class="py-0">
    <v-btn @click="">display</v-btn>
    <v-timeline align-top>
      <!-- <div v-html="chatHtml" id="messages"> -->
    
    
      <!-- </div> -->
    </v-timeline>
  </v-card-text>
</template>

<script>
export default {
  props: ["text","last"],
  data() {
    return {
    }
  },
  methods: {
   
  },
  computed: {
    // chatHtml(){
    //   return this.$store.getters.getChatHtml;
    // }
  },
  mounted() {
  },
}
</script>


<style>

</style>
