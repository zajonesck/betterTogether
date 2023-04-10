<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";
import * as d3 from "d3";
import LineGraph from "@/views/LineGraph.vue";

export default {
  data() {
    return {s
      clientWeight: [],
      newWeight: "",
      newWeighDate: "",
      clientName: "",
      clientBirthDay: "",
      loading: true,
    };
  },

  async mounted() {
    await this.getClient();
    await this.getWeights();
    this.loading = false;
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
          this.clientName = response.data[0].client_name;
          this.clientBirthDay = newBDate(response.data[0].birth_day);
        });
    },

    deleteWeight(weightId) {
      console.log("delete");
      console.log(weightId);
      axios
        .delete(`${import.meta.env.VITE_API_URL}clients_weights/${weightId}`)
        .then((response) => {
          this.getWeights();
        });
    },

    addWeight() {
      const requestBody = {
        weight: this.newWeight,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`,
          requestBody
        )
        .then((response) => {
          this.getWeights();
          this.newWeight = "";
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
    <div v-if="loading">LOADING...</div>
    <div v-else>
      <h1>Weights</h1>
      <h2>{{ clientName }} {{ clientBirthDay }}</h2>
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
      <input
        v-model="newWeight"
        type="integer"
        id="weight"
        placeholder="Weight"
      />

      <button @click="addWeight">✔</button>
      <div>
        <h1>My Line Graph</h1>
        <LineGraph />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
