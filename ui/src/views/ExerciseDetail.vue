<template>
  <div>
    <v-container style="min-height: calc(100vh - 250px)">
      <v-card>
        <v-card-title class="headline">{{ exerciseDetail.name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <h4><strong>Description</strong></h4>
              <p>{{ exerciseDetail.description }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p>
                <strong>Primary Body Part:</strong>
                {{ exerciseDetail.primary_body_part }}
              </p>
            </v-col>
            <v-col cols="6" v-if="exerciseDetail.secondary_body_part">
              <p>
                <strong>Secondary Body Part:</strong>
                {{ exerciseDetail.secondary_body_part }}
              </p>
            </v-col>

            <v-col
              cols="12"
              class="d-flex justify-center flex-column align-center"
            >
              <div class="text-center">
                <strong>Tutorial Video</strong>
              </div>
              <iframe
                width="560"
                height="315"
                :src="exerciseDetail.example_link"
                frameborder="0"
                allowfullscreen
              >
              </iframe>
            </v-col>
          </v-row>
          <!-- Add more fields as necessary, e.g., images, etc. -->
        </v-card-text>
      </v-card>
    </v-container>
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
