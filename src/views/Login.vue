<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg"></v-img>
      </v-flex>
      <v-flex class="separated"></v-flex>
      <v-flex xs12>
        <v-card class="elevation-5">
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                v-model="email"
                :rules="emailRules"
                placeholder="Email"
                clearable
                label="Email"
                type="text"
              ></v-text-field>
              <v-text-field
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                prepend-icon="lock"
                :type="show2 ? 'text' : 'password'"
                name="password"
                v-model="password"
                label="Password"
                hint="At least 8 characters"
                clearable
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>
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
        <strong>LandAway By Oscar Urgelles Marsal v 1.2</strong>
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
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters"
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      show2: false
    };
  },
  methods: {
    validate() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("home");
        })
        .catch(err => {
          alert("Prueva hasta que te canses");
        });
      // console.log("Te has validado ok");
    },
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.$router.push("home");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style>
.container.grid-list-md.text-xs-center {
  background-color: #b2b2f1;
}

.separated {
  margin-top: 50px;
}
.separated100 {
  margin-top: 100px;
}
</style>
