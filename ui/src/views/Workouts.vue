<template>
  <v-card-title> Workouts </v-card-title>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-table fixed-header>
      <thead>
        <tr>
          <th>Workout</th>
          <th>Description</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workout in workouts" :key="workout.id">
          <td>
            <router-link
              :to="{
                name: 'workout-detail',
                params: { id: workout.id },
              }"
            >
              {{ workout.workout_name }}
            </router-link>
          </td>
          <td>{{ workout.description }}</td>
          <td>{{ workout.difficulty }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const workouts = ref([]);

    const getWorkouts = () => {
      axios.get(`${import.meta.env.VITE_API_URL}workouts`).then((response) => {
        workouts.value = response.data;
      });
    };

    return {
      workouts,
      getWorkouts,
    };
  },

  async mounted() {
    await this.getWorkouts();
  },
};
</script>

<style scoped></style>
