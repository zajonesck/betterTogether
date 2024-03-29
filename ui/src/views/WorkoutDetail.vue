<template>
  <div v-if="workout">
    <v-card-title>{{ workout.workout_name }}</v-card-title>

    <v-container style="min-height: calc(100vh - 250px)">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <div v-else-if="workout">
        <v-table fixed-header>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>RPE</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in workout.exercises" :key="exercise.id">
              <td>
                <router-link
                  :to="{ name: 'ExerciseDetail', params: { id: exercise.id } }"
                  class="custom-link"
                >
                  {{ exercise.name }}
                </router-link>
              </td>
              <td>{{ exercise.sets }}</td>
              <td>{{ exercise.reps }}</td>
              <td>{{ exercise.rpe }}</td>
              <td>{{ exercise.duration }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-container>
  </div>
</template>

<script>
import apiClient from "../../apiClient";

export default {
  data() {
    return {
      workout: null,
      loading: true,
    };
  },
  async created() {
    try {
      const workoutId = this.$route.params.id; // get the ID from the route parameter

      const response = await apiClient.get(
        `${import.meta.env.VITE_API_URL}workout/${workoutId}` // use the workoutId
      );

      if (response.data && response.data.exercises) {
        response.data.exercises.sort((a, b) => a.order - b.order);
      }

      this.workout = response.data;
    } catch (error) {
      console.error("Failed to fetch workout:", error);
      // Consider error handling, perhaps setting a dedicated error state here
    } finally {
      this.loading = false; // Set loading state to false whether the request succeeded or failed
    }
  },
};
</script>

<style scoped>
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
../../apiClient
