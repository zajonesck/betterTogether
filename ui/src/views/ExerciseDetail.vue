<template>
  <div>
    <h1>{{ exerciseDetail.name }}</h1>
    <p>{{ exerciseDetail.description }}</p>
    <p>{{ exerciseDetail.primary_body_part }}</p>
    <p>{{ exerciseDetail.secondary_body_part }}</p>
    <!-- Add more fields as necessary, e.g., images, etc. -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      exerciseDetail: {},
    };
  },
  async created() {
    try {
      // Fetch the specific exercise detail using its ID
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}exercises/${this.id}`
      );
      if (response.data) {
        this.exerciseDetail = response.data;

        // Optionally, fetch suggested exercises here based on the main body part...
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the exercise details:",
        error
      );
    }
  },
};
</script>
