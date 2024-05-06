<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="toggleDrawer" v-if="isAuthenticated">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title>Better Together</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container style="min-height: calc(100vh - 250px)">
        <router-view />
      </v-container>
    </v-main>

    <v-footer fixed>
      <v-row justify="center" no-gutters>
        <template v-for="link in footerLinks" :key="link.text">
          <v-btn :href="link.url" class="mx-3 my-1" target="_blank">
            {{ link.text }}
          </v-btn>
        </template>
        <v-col cols="12" class="text-center mt-4">
          &copy; {{ currentYear }} — <strong>Zack Jones</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Auth } from "aws-amplify";
import { useRouter } from "vue-router";

const drawer = ref(false);
const isAuthenticated = ref(false);
const router = useRouter();

const menuItems = [
  { title: "Client List", icon: "mdi-account-group", route: "/client-roster" },
  { title: "Workouts", icon: "mdi-dumbbell", route: "/workout-rx" },
  { title: "Exercises", icon: "mdi-arm-flex", route: "/exercises" },
  { title: "Logout", icon: "mdi-logout", route: "/login" },
];

const footerLinks = [
  { text: "About Me", url: "https://zackjones.xyz/" },
  {
    text: "About Better Together",
    url: "https://github.com/zajonesck/betterTogether.git",
  },
  {
    text: "Interested In Training",
    url: "https://www.bettertogetherfitness.xyz/",
  },
];

const currentYear = new Date().getFullYear();

const checkAuth = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    isAuthenticated.value = true;
  } catch (error) {
    isAuthenticated.value = false;
  }
};

const toggleDrawer = () => (drawer.value = !drawer.value);

onMounted(checkAuth);

const logout = async () => {
  try {
    await Auth.signOut();
    isAuthenticated.value = false;
    sessionStorage.removeItem("jwt");
    router.push("/login");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
</script>

<style scoped>
v-app {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
