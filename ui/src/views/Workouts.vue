<template>
  <v-card-title> Workouts </v-card-title>

  <v-container style="min-height: calc(100vh - 250px)">
    <v-table fixed-header="">
      <thead>
        <tr>
          <!-- if else statement v-if in html here for arrow to flip using sortAscending  -->
          <th v-on:click="sortBy('workout_name')" class="clickable-header">
            Workout
            <v-icon v-if="sortAscending">mdi-arrow-down</v-icon>
            <v-icon v-else>mdi-arrow-up</v-icon>
          </th>

          <th>Description</th>
          <th v-on:click="sortBy('difficulty')" class="clickable-header">
            Difficulty
            <v-icon v-if="sortAscending">mdi-arrow-down</v-icon>
            <v-icon v-else>mdi-arrow-up</v-icon>
          </th>
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
    sortBy: function (property) {
      this.workouts.sort(function (a, b) {
        var textA = a[property].toString().toUpperCase();
        var textB = b[property].toString().toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      if (!this.sortAscending) {
        this.workouts.reverse();
      }
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

<style scoped>
.clickable-header:hover {
  cursor: pointer;
}
</style>
