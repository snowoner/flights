<template>
<v-container>
  <v-tabs
    dark
    color="cyan"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab
      v-for="(chat,i) in AllChats"
      :key="chat.user"
      :href="'#tab-' + i"
    >
      {{ chat.user }}
    </v-tab>

    <v-tabs-items>
      <v-tab-item
        v-for="(chat,i) in AllChats"
        :key="chat.user"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
    <v-btn @click="goHome">Go Home Page</v-btn>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    methods: {
      goHome() {
        this.$router.push("home");
      },
      getUserById(id) {
      var url = `https://landaway-2a000.firebaseio.com/chats.json`;
      fetch(url)
        .then(json => json.json())
        .then(data => {
          var name = null;
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const element = data[key];
              if (key == id) {
                name = element.user.userName;
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      return name;
    },
    },
    computed: {
      AllChats() {
       return this.$store.getters.getAllChats;
      }
    },
    created() {
      this.$store.dispatch("getAllChats");
    },
  }
</script>

<style>

</style>
