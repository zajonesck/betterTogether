<template>
  <div>
    <v-window-item value="workouts">
      <v-select
        v-model="selectedWorkout"
        :items="filteredAvailableWorkouts"
        label="All workouts"
        :filter="searchAvailableWorkoutsFilter"
        :v-model:search-input="searchAvailableWorkouts"
      ></v-select>
      <v-textarea
        v-model="note"
        placeholder="Add notes for this workout"
        @keyup.enter="assignWorkoutToClient"
      ></v-textarea>

      <v-btn @click="assignWorkoutToClient" class="mb-6">Assign Workout</v-btn>
      <v-card-title> Assigned Workouts </v-card-title>
      <v-text-field
        v-model="searchQuery"
        placeholder="Search Assigned Workouts"
      ></v-text-field>
      <v-table>
        <thead>
          <tr>
            <th @click="sortBy('workout_name')" class="clickable-header">
              Workout
              <v-icon v-if="sortedColumn === 'workout_name' && sortAscending"
                >mdi-arrow-down</v-icon
              >
              <v-icon v-else-if="sortedColumn === 'workout_name'"
                >mdi-arrow-up</v-icon
              >
              <v-icon v-else>mdi-sort</v-icon>
            </th>
            <th @click="sortBy('difficulty')" class="clickable-header">
              Difficulty
              <v-icon v-if="sortedColumn === 'difficulty' && sortAscending"
                >mdi-arrow-down</v-icon
              >
              <v-icon v-else-if="sortedColumn === 'difficulty'"
                >mdi-arrow-up</v-icon
              >
              <v-icon v-else>mdi-sort</v-icon>
            </th>
            <th>Notes</th>
            <th @click="sortBy('date')" class="clickable-header">
              Date Assigned
              <v-icon v-if="sortedColumn === 'date' && sortAscending"
                >mdi-arrow-down</v-icon
              >
              <v-icon v-else-if="sortedColumn === 'date'">mdi-arrow-up</v-icon>
              <v-icon v-else>mdi-sort</v-icon>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="clientWorkouts.length === 0">
            <td colspan="4">No assigned workouts.</td>
          </tr>
          <tr
            v-else
            v-for="workout in paginatedAssignedWorkouts"
            :key="workout.id"
          >
            <td>
              <router-link
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
                @click="confirmDelete('workout', workout.client_workout_id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination
        v-model="currentPage"
        :length="totalPagesAssignedWorkouts"
      ></v-pagination>
    </v-window-item>
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
import axios from "axios";
import { newBDate } from "../shared.js";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      note: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchAvailableWorkouts: "",
      confirmDeleteDialog: false,
      itemToDelete: null,
      sortedColumn: "",
      sortAscending: true,
      deleteType: "",
      workouts: [],
      searchQuery: "",
      selectedWorkout: null,
      availableWorkouts: [],
      errorDialog: false,
      errorMessage: "",
      clientWorkouts: [],
    };
  },

  async mounted() {
    try {
      await Promise.all([
        this.getClient(),
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
    paginatedAssignedWorkouts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedWorkouts.slice(start, end);
    },
    totalPagesAssignedWorkouts() {
      return Math.ceil(this.sortedWorkouts.length / this.itemsPerPage);
    },

    filteredWorkouts() {
      if (!this.searchQuery) {
        return this.clientWorkouts;
      }
      const query = this.searchQuery.toLowerCase();
      return this.clientWorkouts.filter(
        (workout) =>
          workout.workout_name.toLowerCase().includes(query) ||
          (workout.description &&
            workout.description.toLowerCase().includes(query)) ||
          workout.difficulty.toLowerCase().includes(query) ||
          (workout.notes && workout.notes.toLowerCase().includes(query))
      );
    },

    sortedWorkouts() {
      let workouts = [...this.filteredWorkouts];
      if (this.sortedColumn) {
        workouts.sort((a, b) => {
          let result = 0;
          if (a[this.sortedColumn] > b[this.sortedColumn]) result = 1;
          if (a[this.sortedColumn] < b[this.sortedColumn]) result = -1;
          return this.sortAscending ? result : -result;
        });
      }
      return workouts;
    },
    filteredAvailableWorkouts() {
      let workouts = this.availableWorkouts.map(
        (workout) => workout.workout_name
      );
      if (this.searchAvailableWorkouts) {
        const query = this.searchAvailableWorkouts.toLowerCase();
        workouts = workouts.filter((workoutName) =>
          workoutName.toLowerCase().includes(query)
        );
      }

      workouts.sort();

      return workouts;
    },
  },

  methods: {
    sortBy(column) {
      if (this.sortedColumn === column) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortedColumn = column;
        this.sortAscending = true;
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

    updateNotes() {},
    capitalize(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
    },
    async deleteClientWorkout(workoutId) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}client_workout/${workoutId}`
        );
        this.getClientWorkouts();
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
    searchAvailableWorkoutsFilter(item, queryText, itemText) {
      return itemText.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
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
        notes: this.note,
        date: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}clients/workouts`,
          requestBody
        );
        await this.getClientWorkouts();
        this.note = ""; // This line clears the textarea after assigning the workout
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
  },
  watch: {
    paginatedAssignedWorkouts: {
      immediate: true,
      handler(newValue) {
        const ids = newValue.map((w) => w.workout_id);
        const uniqueIds = [...new Set(ids)];

        if (ids.length !== uniqueIds.length) {
          console.warn("Duplicate IDs found!", ids);
        }
      },
    },
    searchQuery() {
      this.currentPage = 1; // Reset to the first page whenever search term changes
    },
  },
};
</script>
