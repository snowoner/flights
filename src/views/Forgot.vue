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
              <strong>Reset your password</strong>
              <p
                class="separated"
              >Enter your email and we'll send you a link to reset your password.</p>
              <v-text-field prepend-icon="email" name="email" label="Email" type="email"></v-text-field>
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
export default {
  data() {
    return {};
  },
  methods: {
    validate() {
      console.log("See your email and reset your password");
      this.$router.push("/");
    }
  }
};
</script>


<style>
.separated {
  margin-top: 50px;
}
.height1 {
  height: 1px;
}
</style>
