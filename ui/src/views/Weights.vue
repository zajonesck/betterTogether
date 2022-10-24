<script>
import axios from "axios";

export default {
  data() {},
  mounted() {
    this.getWeights();
  },

  methods: {
    getWeights() {
      axios
        .get(`${import.meta.env.VITE_API_URL}clients_weights/${clientId}`)
        .then((response) => {
          this.clients = response.data;
        });
    },

    addWeight() {
      const requestBody = {
        client_name: this.newClientName,
        birth_day: this.newClientBirthDate,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}clients_weights/${clientId}`,
          requestBody
        )
        .then((response) => {
          console.log(response);
          this.getWeights();
          this.newClientName = "";
          this.newClientBirthDate = "";
        });
    },
  },
};

// deleteWeight(clientId) {
//   console.log("delete");
//   console.log(clientId);
//   axios
//     .delete(`${import.meta.env.VITE_API_URL}clients/${clientId}`)
//     .then((response) => {
//       console.log(response);
//       this.getClients();
//     });
// },
</script>
<template>
  <div id="app">
    <h1>Go to the gym!</h1>
    <table></table>
  </div>
</template>
<style scoped></style>
