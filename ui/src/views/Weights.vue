<script>
import axios from "axios";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      clientWeights: [],
      newWeight: "",
      newWeighDate: "",
    };
  },

  mounted() {
    this.getWeights();
    this.getClient();
  },

  methods: {
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
    },

    getClient() {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }`
        )
        .then((response) => {
          this.client = response.data;
        });
    },

    deleteWeight(weightId) {
      console.log("delete");
      console.log(weightId);
      axios
        .delete(`${import.meta.env.VITE_API_URL}clients_weights/${weightId}`)
        .then((response) => {
          console.log(response);
          this.getWeights();
        });
    },

    getWeights() {
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
    <h2>{{ this.client }}</h2>
    <table>
      <tr>
        <th>Weight</th>
        <th>Date</th>
      </tr>
      <tr v-for="weight in clientWeights">
        <td>
          {{ weight.weight }}
        </td>
        <td>{{ newDate(weight.date) }}</td>

        <td><button @click="deleteWeight(weight.id)">🗑</button></td>
      </tr>
    </table>
    <label>Weight: </label>
    <button @click="addWeight">✔</button>
  </div>
</template>
<style scoped></style>
