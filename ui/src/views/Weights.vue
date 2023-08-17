<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      confirmDeleteDialog: false,
      itemToDelete: null,
      deleteType: "",
      selectedWorkout: null,
      availableWorkouts: [],
      healthMedsNote: "",
      goalsNote: "",
      miscNote: "",
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
        this.getAvailableWorkouts(),
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
    async deleteClientWorkout(workoutId) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}client_workout/${workoutId}`
        );
        this.getClientWorkouts(); // To refresh the client workouts after deletion
      } catch (error) {
        console.error("Error deleting client workout: ", error);
        this.errorMessage = "Failed to delete client workout.";
        this.errorDialog = true;
      }
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

    async assignWorkoutToClient() {
      if (!this.selectedWorkout) return;

      const workout = this.availableWorkouts.find(
        (w) => w.workout_name === this.selectedWorkout
      );

      if (!workout) return;

      const requestBody = {
        client_id: this.$route.params.clientId,
        workout_id: workout.id,
        notes: "",
        date: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}clients/workouts`,
          requestBody
        );
        this.clientWorkouts.push(response.data);

        // Call getClientWorkouts after successfully adding a new workout
        await this.getClientWorkouts();
      } catch (error) {
        console.error("Error assigning workout to client: ", error);
      }
    },

    async getClientWorkouts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}client-workouts/${
            this.$route.params.clientId
          }`
        );
        this.clientWorkouts = response.data;
      } catch (error) {}
    },

    async getAvailableWorkouts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}workouts`
        );
        this.availableWorkouts = response.data;
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    },

    updateNotes() {},
    capitalize(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
    },

    async updateNotes() {
      try {
        const requestBody = {
          health_note: this.healthMedsNote,
          goal_note: this.goalsNote,
          misc_note: this.miscNote,
        };
        await axios.put(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }/notes`,
          {
            health_note: this.healthMedsNote,
            goal_note: this.goalsNote,
            misc_note: this.miscNote,
          }
        );
      } catch (error) {
        console.error("Error updating notes: ", error);
        this.errorMessage = "Failed to update notes.";
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
        const {
          first_name,
          last_name,
          birth_day,
          health_note,
          goal_note,
          misc_note,
        } = response.data[0];
        this.clientFirstName = first_name;
        this.clientLastName = last_name;
        this.clientBirthDay = newBDate(birth_day);
        this.healthMedsNote = health_note;
        this.goalsNote = goal_note;
        this.miscNote = misc_note;
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
        <v-tab value="goals">Goals</v-tab>
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
                    <!-- For Weights -->
                    <v-btn icon @click="confirmDelete('weight', weight.id)">
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
            <v-card-title> Assigned Workouts </v-card-title>
            <v-select
              v-model="selectedWorkout"
              :items="availableWorkouts.map((workout) => workout.workout_name)"
              label="Assign a workout"
            ></v-select>

            <v-btn @click="assignWorkoutToClient" class="mb-6"
              >Assign Workout</v-btn
            >

            <v-table>
              <thead>
                <tr>
                  <th>Workout</th>
                  <th>Difficulty</th>
                  <th>Notes</th>
                  <th>Date Assigned</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="clientWorkouts.length === 0">
                  <td colspan="4">No assigned workouts.</td>
                </tr>
                <tr
                  v-else
                  v-for="workout in clientWorkouts"
                  :key="workout.workout_id"
                >
                  <td>
                    <router-link
                      class="custom-link"
                      :to="{
                        name: 'workout-detail',
                        params: { id: workout.workout_id },
                      }"
                    >
                      {{ workout.workout_name }}
                    </router-link>
                  </td>
                  <td>{{ workout.difficulty }}</td>
                  <td>{{ workout.notes }}</td>
                  <td>{{ newDate(workout.date) }}</td>
                  <td>
                    <v-btn
                      icon
                      @click="
                        confirmDelete('workout', workout.client_workout_id)
                      "
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="goals">
            <v-card-title> Health/Meds </v-card-title>
            <v-textarea
              v-model="healthMedsNote"
              label="Add Health/Meds Notes"
            ></v-textarea>

            <v-card-title> Goals </v-card-title>
            <v-textarea v-model="goalsNote" label="Add Goals"></v-textarea>

            <v-card-title> Misc. </v-card-title>
            <v-textarea v-model="miscNote" label="Add Misc. Notes"></v-textarea>

            <v-btn @click="updateNotes">Save Notes</v-btn>
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
