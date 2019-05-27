<template>
  <v-container>
    <v-tabs dark color="cyan" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="(chat,i) in AllChats" :key="chat.user" @click="setID(chat.id)"  @change="setID(chat.id)" :href="'#tab-' + i">{{ chat.user }}</v-tab>

      <v-tabs-items>
        <v-tab-item v-for="(chat,i) in AllChats" :key="chat.user" :value="'tab-' + i">
          <v-card flat>
            <v-card>
              <v-timeline align-top dense v-for="(message, i) in chat.messages" :key="message.key">
                <v-timeline-item color="pink" small v-if="message.to=='user'">
                  <v-layout pt-3>
                    <v-flex class="mr-2 text-xs-right">
                      <span>{{message.message}}</span>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
                <v-timeline-item color="teal lighten-3" small v-if="message.to=='admin'">
                  <v-layout pt-3>
                    <v-flex class="mr-2 text-xs-left">
                      <span>{{message.message}}</span>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="message"
            :append-outer-icon="message ? 'send' : ''"
            box
            clearable
            label="Message"
            type="text"
            @click:append-outer="sendMessage"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn @click="goHome">Go Home Page</v-btn>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      message: '',
       marker: true,
      iconIndex: 0,
      icons: [
        "mdi-emoticon",
        "mdi-emoticon-cool",
        "mdi-emoticon-dead",
        "mdi-emoticon-excited",
        "mdi-emoticon-happy",
        "mdi-emoticon-neutral",
        "mdi-emoticon-sad",
        "mdi-emoticon-tongue"
      ],
      id: "4F4UE0ej4HeUkyx2scjGnihHCWT2"
    };
  },
  methods: {
    setID(id){
      console.log(id);
      this.id=id;
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      var pushRef = firebase
        .database()
        .ref("chats/" + this.id + "/messages")
        .push({
          to: "user",
          message: this.message
        }).then(()=>{this.$store.dispatch("getAllChats");}).catch(error=>{console.log(error)});
      this.resetIcon();
      this.clearMessage();
      
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
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
    }
  },
  computed: {
    AllChats() {
      return this.$store.getters.getAllChats;
    }
  },
  created() {
    this.$store.dispatch("getAllChats");
  }
};
</script>

<style>
.white{
  background-color: white;
}
</style>
