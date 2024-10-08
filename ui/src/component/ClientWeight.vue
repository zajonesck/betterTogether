<template>
  <div>
    <v-window-item value="weights">
      <v-card-title> Weight History </v-card-title>
      <div style="position: relative; min-height: 250px">
        <v-progress-circular
          v-if="chartLoading"
          indeterminate
          size="70"
        ></v-progress-circular>
        <line-chart
          v-else-if="chartData && Object.keys(chartData).length"
          :chartData="chartData"
          :goal-weight="Number(notes.goalWeight)"
        ></line-chart>
        <div v-if="weightDifference !== null" class="weight-difference">
          <p>{{ weightDifferenceText }}</p>
        </div>
      </div>
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
            <td>{{ weight.weight }}</td>
            <td>{{ newDate(weight.date) }}</td>
            <td>
              <v-btn icon @click="confirmDelete('weight', weight.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-form @submit.prevent="addWeight">
        <v-card-title style="padding-top: 25px"> Weight Check-In </v-card-title>
        <v-text-field
          v-model="newWeight"
          label="Today's Weight"
          required
          type="number"
          step="0.01"
          :rules="[validWeightRule]"
        ></v-text-field>

        <v-btn :loading="weightLoading" @click="addWeight">Add Weight</v-btn>
      </v-form>
      <v-dialog v-model="confirmDeleteDialog" max-width="400px">
        <v-card>
          <v-card-title class="headline">Confirm Deletion</v-card-title>
          <v-card-text>
            Are you sure you want to delete this item?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="proceedToDelete"
              >Yes, Delete</v-btn
            >
            <v-btn icon @click="confirmDelete('weight', weight.id)">
              <v-icon v-if="!weightLoading">mdi-delete</v-icon>
              <v-progress-circular
                v-else
                indeterminate
                size="20"
              ></v-progress-circular>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-window-item>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top timeout="750">
      <div class="text-center flex-grow-1">
        {{ snackbarMessage }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import apiClient from "../../apiClient";
import LineChart from "./LineChart.vue";
import { format, parseISO } from "date-fns";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      weightLoading: false,
      chartLoading: true,
      confirmDeleteDialog: false,
      itemToDelete: null,
      deleteType: "",
      errorDialog: false,
      errorMessage: "",
      clientWeights: [],
      newWeight: "",
      newWeightDate: "",
      loading: true,
      chartData: {},
      notes: {
        healthMedsNote: "",
        goalsNote: "",
        goalWeight: null,
        miscNote: "",
      },
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      validWeightRule: (value) => {
        if (value && !value.toString().match(/^\d+(\.\d{1,2})?$/)) {
          return "Weight should be a number up to two decimal places";
        }
        return true;
      },
    };
  },
  computed: {
    weightDifference() {
      if (this.clientWeights.length && this.notes.goalWeight != null) {
        const currentWeight =
          this.clientWeights[this.clientWeights.length - 1].weight;
        return currentWeight - this.notes.goalWeight;
      }
      return null;
    },

    weightDifferenceText() {
      const difference = this.weightDifference;
      if (difference > 0) {
        return `You need to lose ${difference} lbs to reach your goal.`;
      } else if (difference < 0) {
        return `You need to gain ${Math.abs(
          difference
        )} lbs to reach your goal.`;
      } else {
        return `Congratulations! You have reached your goal weight.`;
      }
    },
  },
  methods: {
    async fetchChartData() {
      this.chartLoading = false;
    },
    confirmDelete(type, itemId) {
      this.deleteType = type;
      this.itemToDelete = itemId;
      this.confirmDeleteDialog = true;
    },
    proceedToDelete() {
      if (this.deleteType === "weight") {
        this.deleteWeight(this.itemToDelete);
      } else if (this.deleteType === "workout") {
        this.deleteClientWorkout(this.itemToDelete);
      }
      this.confirmDeleteDialog = false;
      this.itemToDelete = null;
      this.deleteType = "";
    },
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
    },
    async addWeight() {
      this.weightLoading = true;
      const requestBody = {
        weight: this.newWeight,
        date: this.newWeightDate,
      };
      try {
        await apiClient.post(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`,
          requestBody
        );
        this.getWeights();
        this.newWeight = "";
        this.newWeightDate = "";
        this.snackbarMessage = "Weight added successfully!";
        this.snackbarColor = "success";
        this.snackbar = true;
      } catch (error) {
        console.error("Error adding weight data: ", error);
        this.snackbarMessage = "Failed to add weight. Please try again.";
        this.snackbarColor = "error";
        this.snackbar = true;
        this.errorMessage = "Failed to add weight data.";
        this.errorDialog = true;
      } finally {
        this.weightLoading = false;
      }
    },
    async getClient() {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }`
        );
        const clientData = response.data[0];
        this.notes.healthMedsNote = clientData.health_note;
        this.notes.goalsNote = clientData.goal_note;
        this.notes.goalWeight = clientData.goal_weight;
        this.notes.miscNote = clientData.misc_note;
      } catch (error) {
        console.error("Error fetching client data: ", error);
        this.errorMessage = "Failed to fetch client data.";
        this.errorDialog = true;
      }
    },
    async deleteWeight(weightId) {
      this.weightLoading = true;

      try {
        await apiClient.delete(
          `${import.meta.env.VITE_API_URL}clients_weights/${weightId}`
        );
        this.getWeights();
      } catch (error) {
        console.error("Error deleting weight data: ", error);
        this.errorMessage = "Failed to delete weight data.";
        this.errorDialog = true;
      } finally {
        this.weightLoading = false;
      }
    },
    async getWeights() {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`
        );
        this.clientWeights = response.data;
        this.chartData = {
          labels: response.data.map((w) => format(parseISO(w.date), "MM/dd")),

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
  async mounted() {
    try {
      await Promise.all([this.getWeights(), this.getClient()]);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    } finally {
      this.loading = false;
    }
    this.fetchChartData();
  },
};
</script>

<style scoped>
.weight-difference {
  margin-top: 20px;
  font-size: 16px;
  color: rgb(0, 255, 89);
}
</style>
