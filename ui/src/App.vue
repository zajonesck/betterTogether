<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-title theme="dark">Better Together</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-btn text to="/client-roster" color="black">Client List</v-btn>
      <v-btn text to="/workout-rx" color="black">Workouts</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer padless dark>
      <v-container fluid class="white--text">
        <v-row justify="space-between" align="center">
          <v-col cols="auto">
            <p>&copy; 2023 Zack Jones</p>
          </v-col>
          <v-col cols="auto">
            <v-btn
              text
              color="white"
              href="https://zackjones.xyz/"
              class="px-1 py-1 ml-3"
              target="_blank"
            >
              About Zack
            </v-btn>
            <v-btn
              text
              color="white"
              href="https://github.com/zajonesck/betterTogether.git"
              class="px-1 py-1 ml-3"
              target="_blank"
            >
              About Better Together
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup></script>

<style scoped>
#app {
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
