<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item link to="/client-roster">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-account-group</v-icon> Client List
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/workout-rx">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-dumbbell</v-icon> Workouts
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-logout</v-icon> Logout
          </v-list-item-title>
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
      <v-container style="min-height: calc(100vh - 250)">
        <router-view />
      </v-container>
    </v-main>

    <v-footer>
      <v-row justify="center" no-gutters>
        <v-btn
          href="https://zackjones.xyz/"
          class="px-1 py-1 ml-3"
          target="_blank"
        >
          About Me
        </v-btn>
        <v-btn
          href="https://github.com/zajonesck/betterTogether.git"
          class="px-1 py-1 ml-3"
          target="_blank"
        >
          About Better Together
        </v-btn>
        <v-col class="text-center mt-4" cols="12"
          >&copy; {{ new Date().getFullYear() }} — <strong>Zack Jones</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { Auth } from "aws-amplify";
import { useRouter } from "vue-router";

const drawer = ref(false);
const router = useRouter();

const logout = async () => {
  try {
    await Auth.signOut();
    sessionStorage.removeItem("jwt");
    router.push("/login");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
</script>

<style>
v-app {
  background-image: url("./src/assets/TransparentLogo.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
