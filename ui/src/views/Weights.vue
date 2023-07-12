<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";
import WeightLineGraph from "./WeightLineGraph.vue";

export default {
  components: {
    WeightLineGraph,
  },
  data() {
    return {
      clientWeights: [],
      newWeight: "",
      newWeighDate: "",
      clientName: "",
      clientBirthDay: "",
      loading: true,
      chartData: null,
      defaultChartData: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
          const chartData = {
            labels: response.data.map((w) => w.date),
            datasets: [
              {
                label: "Weight",
                data: response.data.map((w) => w.weight),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
              },
            ],
          };
          this.chartData = chartData;
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
        <h3>My Line Graph</h3>
        <weight-line-graph
          :chart-data="chartData || defaultChartData"
          :options="chartOptions"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
