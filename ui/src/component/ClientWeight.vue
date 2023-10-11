<template>
  <div>
    <v-window-item value="weights">
      <v-card-title> Weight History </v-card-title>
      <line-chart
        v-if="chartData && Object.keys(chartData).length"
        :chartData="chartData"
      ></line-chart>
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
        ></v-text-field>
        <v-btn @click="addWeight">Add Weight</v-btn>
      </v-form>
    </v-window-item>
    <v-dialog v-model="confirmDeleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text> Are you sure you want to delete this item? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="proceedToDelete"
            >Yes, Delete</v-btn
          >
          <v-btn text @click="confirmDeleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiClient from "../../apiClient";
import LineChart from "./LineChart.vue";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
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
    };
  },
  components: {
    LineChart,
  },

  async mounted() {
    try {
      await Promise.all([this.getWeights()]);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
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
      } catch (error) {
        console.error("Error adding weight data: ", error);
        this.errorMessage = "Failed to add weight data.";
        this.errorDialog = true;
      }
    },
    async deleteWeight(weightId) {
      try {
        await apiClient.delete(
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
        const response = await apiClient.get(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`
        );
        this.clientWeights = response.data;
        this.chartData = {
          labels: response.data.map((w) =>
            format(parseISO(w.date), "yyyy-MM-dd")
          ),
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
