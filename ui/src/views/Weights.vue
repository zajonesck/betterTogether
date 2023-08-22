<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";
import ClientGoal from "../component/ClientGoal.vue";
import ClientWorkout from "../component/ClientWorkout.vue";
import ClientWeight from "../component/ClientWeight.vue";

export default {
  components: {
    ClientGoal,
    ClientWorkout,
    ClientWeight,
  },
  data() {
    return {
      confirmDeleteDialog: false,
      itemToDelete: null,
      deleteType: "",
      searchQuery: "",
      tab: null,
      errorDialog: false,
      errorMessage: "",
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
      await Promise.all([this.getClient()]);
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
    updateNotes() {},
    capitalize(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
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
        <v-tab value="goals">Goals</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <ClientWeight />

          <ClientWorkout />

          <ClientGoal />
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
<style scoped>
.clickable-header:hover {
  cursor: pointer;
}
.custom-link {
  display: inline-block;
  text-decoration: underline;
  color: inherit; /* This will make the link use the default text color of its parent */
  transition: color 0.3s ease; /* This will smoothly change the color when hovering */
}

.custom-link:hover {
  color: rgba(
    101,
    42,
    127,
    0.7
  ); /* This will darken the color when hovering, change this value to your preference */
}
</style>
