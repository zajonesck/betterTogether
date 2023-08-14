<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      clientWeights: [],
      clientWorkouts: [],
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
    try {
      await Promise.all([
        this.getClient(),
        this.getWeights(),
        this.getClientWorkouts(),
      ]);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    } finally {
      this.loading = false;
    }
  },

  methods: {
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
    },

    async getClientWorkouts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}client-workouts/${
            this.$route.params.clientId
          }`
        );
        this.clientWorkouts = response.data;
      } catch (error) {
        console.error("Error fetching client workouts: ", error);
      }
    },

    async getClient() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }`
        );
        const { first_name, last_name, birth_day } = response.data[0];
        this.clientFirstName = first_name;
        this.clientLastName = last_name;
        this.clientBirthDay = newBDate(birth_day);
      } catch (error) {
        console.error("Error fetching client data: ", error);
      }
    },

    async addWeight() {
      const requestBody = {
        weight: this.newWeight,
        date: this.newWeightDate,
      };
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`,
          requestBody
        );
        this.getWeights();
        this.newWeight = "";
        this.newWeightDate = "";
      } catch (error) {
        console.error("Error adding weight data: ", error);
      }
    },

    async deleteWeight(weightId) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}clients_weights/${weightId}`
        );
        this.getWeights();
      } catch (error) {
        console.error("Error deleting weight data: ", error);
      }
    },

    async getWeights() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`
        );
        this.clientWeights = response.data;
        this.chartData = {
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
      } catch (error) {
        console.error("Error fetching weight data: ", error);
      }
    },
  },
};
</script>

<template>
  <v-card-title>
    Training History for {{ clientFirstName }} {{ clientLastName }}
  </v-card-title>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else>
      <v-table>
        <thead>
          <tr>
            <th>Workout ID</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workout in clientWorkouts" :key="workout.id">
            <td>{{ workout.workout_id }}</td>
            <td>{{ workout.notes }}</td>
            <td>{{ newDate(workout.date) }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-subtitle>Birth Day: {{ clientBirthDay }}</v-card-subtitle>
      <v-table>
        <thead>
          <tr>
            <th>Weight</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="weight in clientWeights" :key="weight.id">
            <td>
              {{ weight.weight }}
            </td>
            <td>{{ newDate(weight.date) }}</td>

            <td>
              <v-btn icon @click="deleteWeight(weight.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-form @submit.prevent="addWeight">
        <v-card-title style="padding-top: 25px"> Weight Check-In</v-card-title>
        <v-text-field
          v-model="newWeight"
          label="Today's Weight"
          required
        ></v-text-field>
        <v-btn type="submit">Log Weight</v-btn>
      </v-form>
    </div>
  </v-container>
</template>
<style scoped></style>
