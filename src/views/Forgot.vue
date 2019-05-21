<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg"></v-img>
      </v-flex>
      <v-flex class="separated"></v-flex>
      <v-flex xs12>
        <v-snackbar
                v-model="emailSend"
                color= "success"
                :multi-line="mode === 'multi-line'"
                :timeout="0"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn dark flat @click="goLogin">Go Login</v-btn>
              </v-snackbar>
              <v-snackbar
                v-model="emailFail"
                color="error"
                :multi-line="mode === 'multi-line'"
                :timeout="0"
                :vertical="mode === 'vertical'"
              >
                {{ text2 }}
                <v-btn dark flat @click="emailFail = false">Close</v-btn>
              </v-snackbar>
        <v-card class="elevation-5">
          <v-card-text>
            <v-form>
              <strong>Reset your password</strong>
              <p
                class="separated"
              >Enter your email and we'll send you a link to reset your password.</p>
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
        <strong>LandAway By Oscar Urgelles Marsal</strong>
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
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        }
      },
      mode: "multi-line",
      emailSend: false,
      emailFail: false,
      errores: null,
      text:"Email Send! See your Inbox to reset password",
      text2: "Sorry an error ocurred, try reset your password later",
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
          var auth = firebase.auth();
          auth
            .sendPasswordResetEmail(this.email)
            .then(success=> {
              this.emailSend = true;
            })
            .catch(error => {
              this.errores = error.message;
            });
        })
        .catch((error) => {
          this.emailFail = true;
          console.log(error)
          });
    },
    goLogin() {
      this.$router.push("/login"); //this will be changed
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
.height1 {
  height: 1px;
}
.separated100 {
  margin-top: 100px;
}
</style>
