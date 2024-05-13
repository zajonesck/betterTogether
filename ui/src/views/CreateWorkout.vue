<template>
  <div class="create-workout">
    <h1>Create New Workout</h1>
    <v-text-field
      v-model="workoutName"
      label="Enter New Workout Name"
      outlined
      class="mb-3"
    ></v-text-field>

    <!-- Workout Preview -->
    <div class="workout-preview">
      <h2>Workout Preview:</h2>
      <div
        v-for="exercise in selectedExercises"
        :key="exercise.id"
        class="preview-item"
      >
        {{ exercise.name }}
        <v-btn icon @click="removeExerciseFromWorkout(exercise)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>

    <v-subheader class="text-h5"
      >Select exercises for your client's new workout</v-subheader
    >
    <div v-for="exercise in exercises" :key="exercise.id" class="exercise-item">
      {{ exercise.name }}
      <v-btn @click="addExercise(exercise)">Add to Workout</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiClient from "../../apiClient";

export default {
  data() {
    return {
      workoutName: "",
      exercises: [], // All available exercises to add
      selectedExercises: [], // Exercises currently added to the workout
      workoutId: null, // This needs to be set when the workout is saved
    };
  },
  created() {
    this.fetchExercises();
  },
  methods: {
    fetchExercises: async function () {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_API_URL}exercises`
        );
        this.exercises = response.data;
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    },
    addExercise: function (exercise) {
      // Avoid adding the same exercise multiple times
      if (!this.selectedExercises.some((e) => e.id === exercise.id)) {
        this.selectedExercises.push(exercise);
      }
    },
    removeExerciseFromWorkout: function (exercise) {
      if (this.workoutId) {
        // If the workout is saved, make an API call to remove the exercise
        axios
          .delete(`/api/workouts/${this.workoutId}/exercises/${exercise.id}`)
          .then((response) => {
            this.selectedExercises = this.selectedExercises.filter(
              (e) => e.id !== exercise.id
            );
            console.log("Exercise removed successfully:", response.data);
          })
          .catch((error) => {
            console.error("Failed to remove exercise from workout:", error);
          });
      } else {
        // If the workout isn't saved, just remove it from the local array
        this.selectedExercises = this.selectedExercises.filter(
          (e) => e.id !== exercise.id
        );
      }
    },
  },
};
</script>
