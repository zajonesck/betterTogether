<script>
import axios from "axios";

export default {
  data() {
    return {
      clientId: null,
      workouts: [],
      newWorkoutName: "",
    };
  },

  async mounted() {
    this.clientId = this.$route.params.clientId;
    await this.getWorkouts();
  },

  methods: {
    getWorkouts() {
      axios
        .get(`${import.meta.env.VITE_API_URL}workouts/${this.clientId}`)
        .then((response) => {
          this.workouts = response.data;
        });
    },

    addWorkout() {
      const requestBody = {
        workout_name: this.newWorkoutName,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}workouts/${this.clientId}`,
          requestBody
        )
        .then((response) => {
          this.getWorkouts();
          this.newWorkoutName = "";
        });
    },
  },
};
</script>

<template>
  <div id="app">
    <h1>dogs</h1>
  </div>
</template>
