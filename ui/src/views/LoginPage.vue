<template>
  <div>
    <v-container class="flex-container" style="min-height: calc(100vh - 250px)">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="8" sm="8" md="8">
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
            <v-card-actions class="justify-center">
              <v-btn @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center" class="mt-1">
      <v-btn text @click="tryAsGuest" class="mx-2">Try as Guest</v-btn>
      <v-btn text @click="signUp" class="mx-2">Sign Up</v-btn>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { Auth } from "aws-amplify";
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

        if (user && user.signInUserSession) {
          const jwtToken = user.signInUserSession.idToken.jwtToken;
          sessionStorage.setItem("jwt", jwtToken);
          router.push("/client-roster");
        } else {
          error.value = "Authentication failed";
        }
      } catch (err) {
        error.value = err.message || "An error occurred during login";
      }
    };

    // to retrive : const jwtToken = sessionStorage.getItem('jwt');

    const tryAsGuest = () => {
      router.push("/client-roster");
    };

    const signUp = () => {
      router.push("/signup");
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
