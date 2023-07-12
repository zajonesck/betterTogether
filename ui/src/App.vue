<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-toolbar-title class="white--text">Better Together</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/client-roster" color="white">Client List</v-btn>
      <v-btn text to="/workout-rx" color="white">Workouts</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer padless color="deep-purple accent-4" dark>
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

<style scoped></style>
