<template>
  <div v-if="workout">
    <v-card-title>{{ workout.workout_name }}</v-card-title>

    <v-container style="min-height: calc(100vh - 250px)">
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
    };
  },
  async created() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}workout/${this.id}`
    );

    if (response.data && response.data.exercises) {
      response.data.exercises.sort((a, b) => a.order - b.order);
    }

    this.workout = response.data;
  },
};
</script>
