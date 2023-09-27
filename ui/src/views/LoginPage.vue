<template>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Username" required></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login">Login</v-btn>
            <v-btn text @click="tryAsGuest">Try as Guest</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    login() {},
    tryAsGuest() {
      this.$router.push("/client-roster");
    },
  },
};
</script>

<style scoped></style>
