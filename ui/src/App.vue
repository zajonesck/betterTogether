<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item link to="/client-roster">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Client List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/workout-rx">
        <v-list-item-icon>
          <v-icon>mdi-dumbbell</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Workouts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title>Better Together</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer padless>
      <v-container fluid>
        <v-row justify="space-between" align="center">
          <v-col cols="auto">
            <p>&copy; 2023 Zack Jones</p>
          </v-col>
          <v-col cols="auto">
            <v-btn
              href="https://zackjones.xyz/"
              class="px-1 py-1 ml-3"
              target="_blank"
            >
              About Zack
            </v-btn>
            <v-btn
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

<script setup>
import { ref } from "vue";
const drawer = ref(false);
</script>

<style scoped></style>
