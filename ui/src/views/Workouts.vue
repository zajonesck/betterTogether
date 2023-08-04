<template>
  <v-container style="min-height: calc(100vh - 250px)">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Workouts </v-card-title>
          <v-card-text> Coming Soon </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const clientId = ref(null);
    const workouts = ref([]);
    const newWorkoutName = ref("");

    const getWorkouts = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}workouts/${clientId.value}`)
        .then((response) => {
          workouts.value = response.data;
        });
    };

    const addWorkout = () => {
      const requestBody = {
        workout_name: newWorkoutName.value,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}workouts/${clientId.value}`,
          requestBody
        )
        .then((response) => {
          getWorkouts();
          newWorkoutName.value = "";
        });
    };

    return {
      clientId,
      workouts,
      newWorkoutName,
      getWorkouts,
      addWorkout,
    };
  },

  async mounted() {
    this.clientId = this.$route.params.clientId;
    await this.getWorkouts();
  },
};
</script>

<style scoped></style>
