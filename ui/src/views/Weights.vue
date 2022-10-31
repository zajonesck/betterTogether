<script>
import axios from "axios";

export default {
  data() {
    return {
      clientId: [],
      clientWeights: [],
      client_name: " ",
    };
  },

  mounted() {
    this.getWeights();
  },

  methods: {
    getWeights(clientId) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`
        )
        .then((response) => {
          this.clientWeights = response.data;
        });
    },
  },
};
</script>
<template>
  <div id="app">
    <h1>Weights</h1>
    <table>
      <tr>
        <th>Weight</th>
        <th>Date</th>
      </tr>
      <tr v-for="weight in clientWeights">
        <td>
          {{ weight.weight }}
        </td>
        <td>{{ weight.date }}</td>

        <td><button @click="deleteWeight(client.id)">🗑</button></td>
      </tr>
    </table>
    <label>Weight: </label>
    <input v-model="newClientName" type="text" id="name" placeholder="Weight" />
    <button @click="addWeight">✔</button>
  </div>
</template>
<style scoped></style>
