<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      tab: null,
      errorDialog: false,
      errorMessage: "",
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

  computed: {
    capitalizedFirstName() {
      return this.capitalize(this.clientFirstName);
    },
    capitalizedLastName() {
      return this.capitalize(this.clientLastName);
    },
  },

  methods: {
    capitalize(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
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
        this.errorMessage = "Failed to fetch client workouts.";
        this.errorDialog = true;
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
        this.errorMessage = "Failed to fetch client data.";
        this.errorDialog = true;
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
        this.errorMessage = "Failed to add weight data.";
        this.errorDialog = true;
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
        this.errorMessage = "Failed to delete weight data.";
        this.errorDialog = true;
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
        this.errorMessage = "Failed to fetch weight data.";
        this.errorDialog = true;
      }
    },
  },
};
</script>

<template>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else>
      <v-card-title>
        {{ capitalizedFirstName }} {{ capitalizedLastName }}
      </v-card-title>
      <v-card-subtitle>Birth Day: {{ clientBirthDay }}</v-card-subtitle>
      <v-tabs v-model="tab">
        <v-tab value="weights">Weights</v-tab>
        <v-tab value="workouts">Workouts</v-tab>
        <v-tab value="notes">Goals</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="weights">
            <v-card-title> Weight History </v-card-title>
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
              <v-card-title style="padding-top: 25px">
                Weight Check-In</v-card-title
              >
              <v-text-field
                v-model="newWeight"
                label="Today's Weight"
                required
              ></v-text-field>
              <v-btn @click="addWeight">Add Weight</v-btn>
            </v-form>
          </v-window-item>

          <v-window-item value="workouts">
            <v-table>
              <thead>
                <tr>
                  <th>Workout</th>
                  <th>Difficulty</th>
                  <th>Notes</th>
                  <th>Date Assigned</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="workout in clientWorkouts" :key="workout.id">
                  <td>{{ workout.workout_name }}</td>
                  <td>{{ workout.difficulty }}</td>
                  <td>{{ workout.notes }}</td>
                  <td>{{ newDate(workout.date) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-card-text>
      <v-dialog v-model="errorDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Error</v-card-title>
          <v-card-text>
            {{ errorMessage }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="errorDialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<style scoped></style>
