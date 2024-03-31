<template>
  <div class="create-workout">
    <h1>Create New Workout</h1>
    <v-text-field
      v-model="workoutName"
      label="Enter New Workout Name"
      outlined
      class="mb-3"
    ></v-text-field>

    <v-subheader class="text-h5"
      >Select exercises for your client's new workout</v-subheader
    >

    <div v-for="exercise in exercises" :key="exercise.id" class="exercise-item">
      {{ exercise.name }}
      <button @click="addExercise(exercise)">Add to Workout</button>
    </div>
    <!-- Form for saving the workout will go here -->
  </div>
</template>
<script>
import apiClient from "../../apiClient";

export default {
  data() {
    return {
      exercises: [], // Stores fetched exercises
      selectedExercises: [], // Stores exercises added to the workout
    };
  },
  async created() {
    await this.fetchExercises();
  },
  methods: {
    async fetchExercises() {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_API_URL}exercises`
        );
        this.exercises = response.data;
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    },
    addExercise(exercise) {
      this.selectedExercises.push(exercise);
    },
    // Method to remove an exercise from the workout, if needed
    // Method to save the workout, which sends selected exercises to the backend
  },
};
</script>
