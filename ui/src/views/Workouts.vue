<template>
  <v-card-title> Workouts </v-card-title>

  <v-container style="min-height: calc(100vh - 250px)">
    <v-table fixed-header="">
      <thead>
        <tr>
          <th v-on:click="sortBy">Workout</th>
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
import axios from "axios";
export default {
  data() {
    return {
      sortAscending: true,
      workouts: [],
    };
  },
  methods: {
    sortBy: function () {
      console.log("idiot");
      this.workouts.sort(function (a, b) {
        var textA = a.workout_name.toUpperCase();
        var textB = b.workout_name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      if (!this.sortAscending) {
        this.workouts.reverse();
      }
      console.log("copeouts", this.workouts);
      this.sortAscending = !this.sortAscending;
    },
    getWorkouts() {
      axios.get(`${import.meta.env.VITE_API_URL}workouts`).then((response) => {
        this.workouts = response.data;
      });
    },
  },
  async mounted() {
    await this.getWorkouts();
  },
};
</script>

<style scoped></style>
