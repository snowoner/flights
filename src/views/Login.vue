<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
     <v-flex xs12 class="white">
        <v-img class="elevation-5 " max-height="200px" contain :src="require('../../public/logo_landaway_cuadrat.jpg')"></v-img>
      </v-flex>
      <v-flex xs12>
        <v-card class="elevation-5">
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
                <p class="headline text-xs-center mb-0">Login</p>
                <v-spacer></v-spacer>
                <router-link to="/profile">
                  <v-avatar class="mr-3" size="30px" color="grey lighten-4">
                  <img
                    :src="require('../../public/nouser.png')"
                    alt="avatar"
                  >
                </v-avatar>
                </router-link>
              </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                clearable
                v-model="email"
                name="Email"
                v-validate.continues="'email'"
                :error-messages="errors.collect('email')"
                label="E-mail"
                data-vv-name="email"
                required
              ></v-text-field>
              <v-text-field
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                prepend-icon="lock"
                :type="show2 ? 'text' : 'password'"
                name="password"
                v-model="password"
                label="Password"
                hint="At least 6 characters"
                v-validate.continues="'min:6'"
                data-vv-as="Password"
                :error-messages="errors.collect('password')"
                clearable
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>
            <v-card v-if="errores!=null">
              <p class="red--text">{{errores}}</p>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">Login</v-btn>
            <v-spacer></v-spacer>
            <!-- <v-img
              width="30px"
              @click="fbLogin"
              height="100%"
              :src="require('../../public/fb.png')"
            ></v-img>-->
            <v-img
              width="30px"
              @click="googleLogin"
              height="100%"
              :src="require('../../public/google.jpg')"
            ></v-img>
            <!-- <v-img width="30px" height="100%" :src="require('../../public/github.svg')"></v-img> -->
            <v-spacer></v-spacer>
          </v-card-actions>
          <router-link to="/forgot">
            <p class="separated">Forgot your user or password?</p>
          </router-link>
          <v-btn to="/register">Register</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway By Oscar Urgelles Marsal v 1.5</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      dictionary: {
        attributes: {
          email: "E-mail Address",
          password: "Password"
          // custom attributes
        }
      },
      show2: false,
      errores: null,
        menu: [
        { title: "Home", to: "/home"},
        { title: "Flights", to: "/flights/ " },
        { title: "My Flights", to: "/myflights" }
      ],
    };
  },
  methods: {
    validate() {
      this.errores = null;
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            
            return;
          }
             firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setUser", user);
           this.$store.dispatch("getMessage");
          //this code is temporal

        //    firebase
        // .database()
        // .ref("users/" + userId + "/user")
        // .push({
        //   to: "admin",
        //   message: this.message
        // })
        // .then(() => {
        //  this.$store.dispatch("getChat");
        // })
        // .catch(error => {
        //   console.log(error);
        // });
          this.$router.replace("myflights");  //this will be changed

        })
        .catch(error => {
          this.errores=error.message;
        });
        })
        .catch(error => {this.errores=error.message});

   
    },
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.$store.commit("setUser", user); 
          this.$store.dispatch("getMessage");
          this.$store.dispatch("getMessages");
          this.$router.replace("myflights"); 
        
         
        })
        .catch(error => {
          this.errores = error.message;
        });
    }
  },
};
</script>


<style>
.container.grid-list-md.text-xs-center {
  background-color: #b2b2f1;
}
.white{
  background-color: white;
}
.separated {
  margin-top: 50px;
}
.separated100 {
  margin-top: 100px;
}
</style>
