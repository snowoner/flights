<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 class="white">
        <v-img class="elevation-5 "  max-height="80px" contain :src="require('../../public/logo_landaway_rectangular.jpg')"></v-img>
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
                      <router-link class="myMenu" :to="item.to">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </router-link>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <p class="headline text-xs-center mb-0">My Flights</p>
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
              <v-container fluid v-if="user!=null&&!openChat">
                <v-layout row wrap>
                  <v-flex xs12 v-if="dbFlights">
                    <Flight
                      v-for="(flight, index) in dbFlights"
                      :key="index"
                      :flight="flight.flight.flight"
                      :oneWay="flight.flight.flight.hasOwnProperty('return_duration')?false:true"
                      :id="flight.id"
                    ></Flight>
                  </v-flex>
                </v-layout>
                <v-flex v-if="!dbFlights||dbFlights.length==0">
                  <v-card>
                    <v-card-text>
                      {{user.user.displayName?user.user.displayName+" you":""||" You "}} don't have any flights yet!
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-container>
              <v-container v-if="openChat">
                <v-card>
                  <v-timeline align-top dense v-for="message in chat" :key="message.key">
                    <v-timeline-item color="pink" small v-if="message.to=='user'">
                      <v-layout pt-3>
                        <v-flex class="text-xs-left smallDate">
                          <strong>{{message.time||"???"}}</strong>
                        </v-flex>
                        <v-flex class="mr-2 text-xs-left">
                          <span>{{message.message}}</span>
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>
                    <v-timeline-item color="teal lighten-3" small v-if="message.to=='admin'">
                      <v-layout pt-3>
                        <v-flex class="text-xs-left smallDate">
                          <strong >{{message.time||"???"}}</strong>
                        </v-flex>
                        <v-flex class="mr-2 text-xs-right">
                          <span>{{message.message}}</span>
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>
                  </v-timeline>
                </v-card>
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
              </v-container>
              <v-container v-if="user==null">
                <v-flex>
                  <v-card>
                    <v-card-text>
                      Only registered users can see their flights
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn to="/login">Login</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-container>

              <v-btn v-if="user" absolute dark fab bottom right color="indigo" @click="open">
                <v-badge left color="red">
                  <template v-slot:badge>
                    <span v-if="chat&&chat.length>0">!</span>
                  </template>
                  <v-icon>chat</v-icon>
                </v-badge>
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway made with Love &#128147;</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import Flight from "../components/Flight.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      menu: [
        { title: "Home", to: "/home" },
        { title: "Flights", to: "/flights/ " }
      ],
      openChat: false,
      password: "Password",
      show: false,
      message: "",
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
      ]
    };
  },
  methods: {
    open() {
      if (this.openChat == false) {
        // this.displayChat();

        this.openChat = true;
      } else {
        this.openChat = false;
      }
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      var pushRef = firebase
        .database()
        .ref("chats/" + this.user.user.uid + "/messages")
        .push({
          to: "admin",
          time: new Date().getHours()+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()),
          message: this.message
        })
        .then(() => {
          firebase.database().ref("chats/" + this.user.user.uid + "/user")
          .set({userName:this.user.user.displayName||this.user.user.email})
          .then(()=>{})
          .catch(error=>{console.log(error)});
        })
        .catch(error => {
          console.log(error);
        });
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
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    selectFlight() {
      //esto se va a la puta
      return this.$store.getters.getSelectFlight;
    },
    dbFlights() {
      return this.$store.getters.getDbFlights;
    },
    // chatMessages() {
    //   return this.$store.getters.getChat;
    // },
    icon() {
      return this.icons[this.iconIndex];
    },
    chat() {
      return this.$store.getters.getChat;
    }
  },
  created() {
    this.$store.dispatch("getDbFlights");
  },
  components: {
    Flight,
  }
};
</script>

<style>
.separated100 {
  margin-top: 100px;
}
.white{
  background-color: white;
}
.smallDate{
     display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 50px;
}
.justy{
  text-align: justify;
}
</style>
  