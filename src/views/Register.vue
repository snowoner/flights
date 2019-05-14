<template>
 
      <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg">
        </v-img>
      </v-flex>
      <v-flex class="separated"></v-flex>
      <v-flex xs12>
        <v-card class="elevation-5">
          <v-card-text>
            <v-form>
              <h2><strong>Welcome to LandAway</strong></h2>
              <v-text-field
                prepend-icon="email"
                name="email"
                v-model="email"
                label="Email"
                type="email"
              ></v-text-field>
                <v-text-field
                prepend-icon="lock"
                name="password"
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
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

import firebase from 'firebase';

export default {
  data() {
    return {
      email:'',
      password:''
    }
  },
  methods: {
    validate(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=>{
          this.$router.replace("home");
      })
      .catch(function(error) {
          console.log(error);
    });
      
    }
  },
}
</script>


<style>
.container.grid-list-md.text-xs-center {
    background-color: #b2b2f1;
}
</style>
