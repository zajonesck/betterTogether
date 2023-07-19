<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";


export default {
  components: {
    WeightLineGraph,
  },
  data() {
    return {
      clientWeights: [],
      newWeight: "",
      newWeighDate: "",
      clientFirstName: "",
      clientLastName: "",
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
          this.clientFirstName = response.data[0].first_name;
          this.clientLastName = response.data[0].last_name;
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
        date: this.newWeightDate,
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
      <h1 style="text-align: center">
        Weight History for {{ clientFirstName }} {{ clientLastName }}
      </h1>
      <h2 style="text-align: center">DOB: {{ clientBirthDay }}</h2>
      <v-table>
        <tr>
          <th>Weight</th>
          <th>Date</th>
        </tr>
        <tr v-for="weight in clientWeights" :key="weight.id">
          <td style="text-align: center">
            {{ weight.weight }}
          </td>
          <td style="text-align: center">{{ newDate(weight.date) }}</td>

          <td><button @click="deleteWeight(weight.id)">🗑</button></td>
        </tr>
      </v-table>
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="newWeight"
            type="integer"
            id="weight"
            placeholder="Weight"
            style="color: white"
            @keyup.enter="addWeight"
          />
        </v-col>

        <v-col cols="2" class="d-flex align-self-center">
          <v-btn @click="addWeight">✔</v-btn>
        </v-col>
      </v-row>

      <!-- <div>
        <h3>My Line Graph</h3>
        <weight-line-graph
          :chart-data="chartData || defaultChartData"
          :options="chartOptions"
        />
      </div> -->
    </div>
  </div>
</template>
<style scoped></style>
