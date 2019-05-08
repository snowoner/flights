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
              <v-text-field
                prepend-icon="person"
                name="user"
                placeholder="Phone or Email"
                label="User"
                type="text"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">Login</v-btn>
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
export default {
  data() {
    return {};
  },
  methods: {
    validate() {
      console.log("Te has validado ok");
      this.$router.push("home");
    }
  }
};
</script>


<style>

.container.grid-list-md.text-xs-center {
    background-color: #ccccf3;
}

.separated {
  margin-top: 50px;
}
.separated100 {
  margin-top: 100px;
}

</style>
