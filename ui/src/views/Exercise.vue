<template>
  <div>
    <v-card-title>Exercises</v-card-title>

    <v-container style="min-height: calc(100vh - 250px)">
      <v-text-field
        v-model="searchQuery"
        clearable
        label="Search Exercises"
        variant="outlined"
      ></v-text-field>
      <v-progress-circular
        v-if="!exercises.length"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <div v-else>
        <v-table fixed-header>
          <thead>
            <tr>
              <th @click="sortBy('name')" class="clickable-header">
                Name
                <v-icon v-if="sortedColumn === 'name' && sortAscending"
                  >mdi-arrow-down</v-icon
                >
                <v-icon v-else-if="sortedColumn === 'name'"
                  >mdi-arrow-up</v-icon
                >
                <v-icon v-else>mdi-sort</v-icon>
              </th>
              <th>Description</th>
              <th @click="sortBy('primary_body_part')" class="clickable-header">
                Primary Body Part
                <v-icon
                  v-if="sortedColumn === 'primary_body_part' && sortAscending"
                  >mdi-arrow-down</v-icon
                >
                <v-icon v-else-if="sortedColumn === 'primary_body_part'"
                  >mdi-arrow-up</v-icon
                >
                <v-icon v-else>mdi-sort</v-icon>
              </th>
              <th
                @click="sortBy('secondary_body_part')"
                class="clickable-header"
              >
                Secondary Body Part
                <v-icon
                  v-if="sortedColumn === 'secondary_body_part' && sortAscending"
                  >mdi-arrow-down</v-icon
                >
                <v-icon v-else-if="sortedColumn === 'secondary_body_part'"
                  >mdi-arrow-up</v-icon
                >
                <v-icon v-else>mdi-sort</v-icon>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="exercise in exercises" :key="exercise.id">
              <td>{{ exercise.name }}</td>
              <td>{{ exercise.description }}</td>
              <td>{{ exercise.primary_body_part }}</td>
              <td>{{ exercise.secondary_body_part }}</td>
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
  data() {
    return {
      exercises: [],
      searchQuery: "",
      sortedColumn: null,
      sortAscending: true,
    };
  },
  computed: {
    filteredExercises() {
      const query = this.searchQuery.toLowerCase();
      return this.exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(query) ||
          exercise.description.toLowerCase().includes(query) ||
          exercise.primary_body_part.toLowerCase().includes(query) ||
          exercise.secondary_body_part.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    sortBy(property) {
      if (this.sortedColumn === property) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortedColumn = property;
        this.sortAscending = true; // default to ascending when changing columns
      }

      this.exercises.sort((a, b) => {
        const textA = a[property] ? a[property].toString().toUpperCase() : "";
        const textB = b[property] ? b[property].toString().toUpperCase() : "";

        // Check for null values
        if (a[property] === null && b[property] !== null)
          return this.sortAscending ? 1 : -1;
        if (a[property] !== null && b[property] === null)
          return this.sortAscending ? -1 : 1;
        if (a[property] === null && b[property] === null) return 0;

        // Standard sorting if both values are non-null
        return this.sortAscending
          ? textA.localeCompare(textB)
          : textB.localeCompare(textA);
      });
    },

    async getAllExercises() {
      try {
        const response = await axios.get("http://localhost:3000/exercises");
        if (response.data && response.data.message) {
          console.error(response.data.message);
        } else {
          this.exercises = response.data;
        }
      } catch (error) {
        console.error("An error occurred while fetching the exercises:", error);
      }
    },
  },
  async created() {
    await this.getAllExercises();
  },
};
</script>

<style scoped>
.clickable-header:hover {
  cursor: pointer;
}
</style>
