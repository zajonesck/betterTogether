<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-card class="mx-auto" dark>
          <v-card-title>
            <h1 class="text-h5 white--text">Workouts</h1>
          </v-card-title>
          <v-card-text>
            <h2 class="text-h6 white--text">Coming Soon</h2>
          </v-card-text>
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
