<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg"></v-img>
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
                <p class="headline text-xs-center mb-0">Profile</p>
                <v-spacer></v-spacer>
                <v-icon left large>account_circle</v-icon>
              </v-card-title>
              <v-container v-if="alert">
                <v-alert
                  :value="alert"
                  type="success"
                  transition="scale-transition"
                >Logout successfully</v-alert>
              </v-container>
              <v-container fluid>
                <v-layout row class="text-center" align-items-center justify-content-center>
                  <v-flex xs6>
                    <v-card flat>
                      <v-card-title primary-title>
                        <div>
                          <v-btn v-if="editing" small>
                            Change
                            <v-icon small right>create</v-icon>
                          </v-btn>
                          <h3 class="headline mb-0">Name</h3>
                          <div>The real name</div>
                        </div>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>
                    <div>
                      <div class="end">
                        <v-btn small fab @click="edit">
                          <v-icon>build</v-icon>
                        </v-btn>
                        <v-btn small fab @click="user!=null?logout():login()">
                          <v-icon v-if="user" medium>highlight_off</v-icon>
                          <v-icon v-if="!user" medium>power_settings_new</v-icon>
                        </v-btn>
                      </div>

                      <v-card flat class="center">
                        <v-img :src="require('../../public/bcn.jpg')"></v-img>
                      </v-card>
                      <v-btn v-if="editing" small>
                        UpLoad
                        <v-icon small right>attach_file</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row class="text-center big" align-items-center justify-content-center>
                  <v-flex xs2 class="center">
                    <v-icon color="indigo">mail</v-icon>
                  </v-flex>
                  <v-flex xs3>
                    <strong>E-mail</strong>
                  </v-flex>
                  <v-flex class="center">
                    <v-btn v-if="editing" small>
                      Change
                      <v-icon small right>create</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-divider inset></v-divider>
                <v-layout row class="text-center big" align-items-center justify-content-center>
                  <v-flex xs2 class="center">
                    <v-icon color="indigo">lock</v-icon>
                  </v-flex>
                  <v-flex xs3>
                    <strong>Password</strong>
                  </v-flex>
                  <v-flex class="center">
                    <v-btn v-if="editing" small>
                      Reset
                      <v-icon small right>create</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway made with Love &lt;3</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      menu: [
        { title: "Home", to: "/home " },
        { title: "Flights", to: "/flights/ " },
        { title: "My Flights", to: "/myflights" }
      ],
      editing: false,
      alert: false,
    };
  },
  methods: {
    edit() {
      this.editing = !this.editing;
    },
    login(){
      console.log("i do shit");
     this.$router.replace("/login");
    },
    logout() {
      if (this.user) {
        firebase
          .auth()
          .signOut()
          .then(res => {
            // Sign-out successful.
            this.$store.commit("setUser", null);
            this.alert = true;
          })
          .catch(error => {
            console.log("Algo pasa");
            console.log(error);
          });
      } else {
        console.log("not logged sorry");
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style scoped>
.separated100 {
  margin-top: 100px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card__title.v-card__title--primary {
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout.text-center.big.row.align-items-center.justify-content-center {
  height: 60px;
}
.end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.hiperHeight {
  height: 80px;
}
</style>
