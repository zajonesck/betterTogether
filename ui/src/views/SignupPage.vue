<template>
  <div>
    <v-container style="min-height: calc(100vh - 250px)">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title>Signup</v-card-title>
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
                  autocomplete="new-password"
                ></v-text-field>
                <v-text-field
                  v-model="verifyPassword"
                  label="Verify Password"
                  type="password"
                  required
                  autocomplete="new-password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="signup">Signup</v-btn>
              <v-btn text @click="login">Already have an account?</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="showVerificationPopup" max-width="290">
      <v-card>
        <v-card-title>Email Verification</v-card-title>
        <v-card-text>
          A verification code has been sent to your email. Please check your
          inbox and enter the code below.
          <v-text-field
            v-model="verificationCode"
            label="Verification Code"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="confirmSignUp">Confirm</v-btn>
          <v-btn @click="showVerificationPopup = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "aws-amplify"; // Importing Auth module

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const verifyPassword = ref("");
    const error = ref(null);
    const router = useRouter();
    const showVerificationPopup = ref(false);
    const verificationCode = ref("");

    const signup = async () => {
      try {
        if (password.value !== verifyPassword.value) {
          error.value = "Passwords do not match.";
          return;
        }
        await Auth.signUp({
          username: email.value,
          password: password.value,
          attributes: {
            email: email.value,
          },
        });

        showVerificationPopup.value = true;
      } catch (err) {
        error.value = err.message || "An error occurred during signup";
      }
    };

    const confirmSignUp = async () => {
      try {
        await Auth.confirmSignUp(email.value, verificationCode.value);
        showVerificationPopup.value = false; // Close the verification dialog
        router.push("/login"); // Navigate to login or another page after successful signup
      } catch (err) {
        console.log(err);
        error.value = "Error verifying the code. Please try again.";
      }
    };

    const login = () => {
      router.push("/login"); // Navigate to the login route
    };

    return {
      email,
      password,
      verifyPassword,
      error,
      signup,
      login,
      showVerificationPopup,
      verificationCode,
      confirmSignUp,
    };
  },
};
</script>
