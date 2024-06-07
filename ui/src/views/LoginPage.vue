<template>
  <div>
    <v-container class="flex-container" style="min-height: calc(100vh - 250px)">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="8" sm="8" md="8">
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-alert v-if="error" type="error">{{ error }}</v-alert>
              <v-form ref="form" @submit.prevent="login" @keyup.enter="login">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                  autocomplete="email"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  required
                  autocomplete="current-password"
                >
                  <template v-slot:append>
                    <v-icon @click="togglePasswordVisibility">
                      {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
                    </v-icon>
                  </template>
                </v-text-field>
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
    const showPassword = ref(false); // Add a ref for password visibility
    const error = ref(null);
    const router = useRouter();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
      try {
        const user = await Auth.signIn(email.value, password.value);

        if (user && user.signInUserSession) {
          const jwtToken = user.signInUserSession.idToken.jwtToken;
          sessionStorage.setItem("jwt", jwtToken);

          const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
          const tokenDuration = decodedToken.exp * 1000 - Date.now();
          setTimeout(() => {
            sessionStorage.removeItem("jwt");
            router.push("/login");
          }, tokenDuration);

          router.push("/client-roster");
        } else {
          error.value = "Authentication failed";
        }
      } catch (err) {
        error.value = err.message || "An error occurred during login";
      }
    };

    const signUp = () => {
      router.push("/signup");
    };

    return {
      password,
      email,
      showPassword, // Add showPassword to the return object
      error,
      login,
      signUp,
      togglePasswordVisibility, // Add the toggle function to the return object
    };
  },
};
</script>
