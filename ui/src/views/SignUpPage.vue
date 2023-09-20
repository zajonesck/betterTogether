<template>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Sign Up</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="username"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <!-- <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field> -->
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="signUp">Sign Up</v-btn>
            <v-btn text @click="redirectToLogin"
              >Already have an account?</v-btn
            >
            <v-btn text @click="tryAsGuest">Try as Guest</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showVerificationDialog" max-width="290">
    <v-card>
      <v-card-title>Enter Verification Code</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="verificationCode"
          label="Verification Code"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="confirmSignUp">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showCheckEmailDialog" max-width="290">
    <v-card>
      <v-card-title>Email Verification</v-card-title>
      <v-card-text>
        A verification code has been sent to your email. Please check your inbox
        and enter the code to complete the sign-up process.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showCheckEmailDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      jwtToken: null,
      username: "",
      password: "",
      // email: "",
      verificationCode: "", // New data property for verification code
      showVerificationDialog: false, // New data property to control visibility of verification dialog
      showCheckEmailDialog: false, // New data property for the check email dialog
    };
  },
  methods: {
    async signUp() {
      try {
        const data = await Auth.signUp({
          username: this.username,
          password: this.password,
          // attributes: {
          //   email: this.email,
          // },
        });
        console.log(data);
        this.showCheckEmailDialog = true; // Show the check email dialog
      } catch (err) {
        if (err.code === "UsernameExistsException") {
          // Handle username already exists error
          console.log("Username already exists.");
        } else {
          console.log(err);
          // Handle other sign-up errors
        }
      }
    },
    async confirmSignUp() {
      try {
        await Auth.confirmSignUp(this.username, this.verificationCode);
        this.showVerificationDialog = false; // Close the verification dialog
        // Notify user that confirmation was successful, or auto-login the user
      } catch (err) {
        console.log(err);
        // Handle errors during confirmation
      }
    },
    redirectToLogin() {
      this.$router.push("/login"); // Redirect to the login page
    },
    tryAsGuest() {
      // Logic for guest user access
      this.$router.push("/client-roster"); // Redirect to a guest dashboard or appropriate route
    },
  },
};
</script>

<style scoped>
/* Add any additional styling for your login page here */
</style>
