<script setup></script>

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
  </v-app>
</template>

<script setup></script>

<style scoped></style>
