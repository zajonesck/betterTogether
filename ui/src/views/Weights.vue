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
  },

  methods: {
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
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

        <td><button>🗑</button></td>
      </tr>
    </table>
    <label>Weight: </label>
    <button @click="addWeight">✔</button>
  </div>
</template>
<style scoped></style>
