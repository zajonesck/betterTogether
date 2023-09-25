<template>
  <div>
    <v-card-title>
      Workouts
      <v-list-subheader>
        <router-link to="/exercises" class="custom-link"
          >View Exercises</router-link
        >
      </v-list-subheader>
    </v-card-title>

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
import axios from "axios";

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      sortAscending: true,
      workouts: [],
      loading: true,
      searchQuery: "",
      sortedColumn: null,
    };
  },
  methods: {
    async getWorkouts() {
      try {
        const response = await axios.get(
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
    },
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredWorkouts.slice(start, end); // corrected to 'filteredWorkouts'
    },
    totalItems() {
      return this.filteredWorkouts.length; // corrected to 'filteredWorkouts'
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
