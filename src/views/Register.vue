<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
       <v-flex xs12 class="white">
        <v-img class="elevation-5 "  max-height="80px" contain :src="require('../../public/logo_landaway_rectangular.jpg')"></v-img>
      </v-flex>
      <v-flex class="separated"></v-flex>
      <v-flex xs12>
        <v-card class="elevation-5">
          <v-card-text>
            <v-form>
              <h2>
                <strong>Welcome to LandAway</strong>
              </h2>
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
            <v-btn color="primary" @click="goLogin">Go Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">Send</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <div class="separated height1"></div>
        </v-card>
      </v-flex>
      <v-flex xs12 class="separated100">
     <strong>LandAway made with Love &#128147; By <a href="https://www.linkedin.com/in/oscarurgelles/">Oscar Urgelles</a></strong>
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
      errores: null
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
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
              this.$store.commit("setUser",user)
              this.$router.replace("myflights"); ////this will be changed
            })
            .catch(error =>{
              this.errores=error.message;
            });
        })
        .catch(() => {});
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>


<style>
.container.grid-list-md.text-xs-center {
  background-color: #b2b2f1;
}
.white{
  background-color: white;
}
.separated100 {
  margin-top: 100px;
}
a{
  text-decoration: none;
}
</style>
