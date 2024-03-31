<template>
  <div>
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <v-card-title class="display-1">Workouts</v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="navigateToCreateWorkout"
            >Create New Workout</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container style="min-height: calc(100vh - 250px)">
      <v-text-field
        v-model="searchQuery"
        clearable
        label="Search Workouts"
        variant="outlined"
      ></v-text-field>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>

      <div v-else>
        <v-table fixed-header="">
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
              <th>Description</th>
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
            </tr>
          </thead>

          <tbody>
            <tr v-for="workout in paginatedItems" :key="workout.id">
              <td>
                <router-link
                  :to="{
                    name: 'workout-detail',
                    params: { id: workout.id },
                  }"
                  class="custom-link"
                >
                  {{ workout.workout_name }}
                </router-link>
              </td>
              <td>{{ workout.description }}</td>
              <td>{{ workout.difficulty }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(totalItems / itemsPerPage)"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import apiClient from "../../apiClient";

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      sortAscending: true,
      workouts: [],
      loading: true,
      searchQuery: "",
      sortedColumn: null,
    };
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
  },
  methods: {
    navigateToCreateWorkout() {
      this.$router.push({ name: "CreateWorkout" });
    },

    async getWorkouts() {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_API_URL}workouts`
        );
        this.workouts = response.data;
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        this.loading = false;
      }
    },
    sortBy(property) {
      if (this.sortedColumn === property) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortedColumn = property;
        this.sortAscending = true; // default to ascending when changing columns
      }

      this.workouts.sort((a, b) => {
        const textA = a[property].toString().toUpperCase();
        const textB = b[property].toString().toUpperCase();
        return this.sortAscending
          ? textA.localeCompare(textB)
          : textB.localeCompare(textA);
      });

      this.currentPage = 1; // Reset to the first page when sorting
    },
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredWorkouts.slice(start, end);
    },
    totalItems() {
      return this.filteredWorkouts.length;
    },
    filteredWorkouts() {
      if (!this.searchQuery) {
        return this.workouts;
      }
      const query = this.searchQuery.toLowerCase();
      return this.workouts.filter(
        (workout) =>
          workout.workout_name.toLowerCase().includes(query) ||
          workout.description.toLowerCase().includes(query) ||
          workout.difficulty.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.getWorkouts();
  },
};
</script>

<style scoped>
.clickable-header:hover {
  cursor: pointer;
}
.custom-link {
  display: inline-block;
  text-decoration: underline;
  color: inherit;
  transition: color 0.3s ease;
}

.custom-link:hover {
  color: rgba(101, 42, 127, 0.7);
}
</style>
../../apiClient
