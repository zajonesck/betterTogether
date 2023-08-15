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
              <td>{{ exercise.name }}</td>
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
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      workout: null,
      loading: true,
    };
  },
  async created() {
    try {
      const workoutId = this.$route.params.id; // get the ID from the route parameter

      const response = await axios.get(
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
