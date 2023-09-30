<template>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-alert v-if="error" type="error">{{ error }}</v-alert>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                required
                autocomplete="email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                autocomplete="current-password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login">Login</v-btn>
            <v-btn text @click="tryAsGuest">Try as Guest</v-btn>
            <v-btn text @click="signUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { Auth } from "aws-amplify"; // Importing Auth module
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();

    const login = async () => {
      try {
        const user = await Auth.signIn(email.value, password.value);

        if (user) {
          // Navigate to a different page after successful login, if needed
          router.push("/client-roster");
        } else {
          error.value = "Authentication failed";
        }
      } catch (err) {
        error.value = err.message || "An error occurred during login";
      }
    };

    const tryAsGuest = () => {
      router.push("/client-roster");
    };

    const signUp = () => {
      router.push("/signup"); // Navigate to the signup page
    };

    return {
      password,
      email,
      error,
      login,
      tryAsGuest,
      signUp,
    };
  },
};
</script>

<style scoped></style>
