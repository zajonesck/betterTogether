<template>
  <v-window-item value="goals">
    <v-card-title> Health/Meds </v-card-title>
    <v-textarea
      v-model="healthMedsNote"
      label="Add Health/Meds Notes"
    ></v-textarea>
    <v-card-title> Goals </v-card-title>
    <v-textarea v-model="goalsNote" label="Add Goals"></v-textarea>
    <v-card-title> Misc. </v-card-title>
    <v-textarea v-model="miscNote" label="Add Misc. Notes"></v-textarea>
    <v-btn @click="updateNotes">Save Notes</v-btn>
  </v-window-item>
</template>

<script>
import axios from "axios";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      healthMedsNote: "",
      goalsNote: "",
      miscNote: "",
      confirmDeleteDialog: false,
      itemToDelete: null,
      deleteType: "",
      workouts: [],
      searchQuery: "",
      selectedWorkout: null,
      availableWorkouts: [],
      tab: null,
      errorDialog: false,
      errorMessage: "",
      clientWeights: [],
      clientWorkouts: [],
      newWeight: "",
      newWeighDate: "",
      clientFirstName: "",
      clientLastName: "",
      clientBirthDay: "",
      loading: true,
      chartData: null,
      defaultChartData: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
    };
  },

  async mounted() {
    try {
      await Promise.all([this.getClient()]);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async updateNotes() {
      try {
        const requestBody = {
          health_note: this.healthMedsNote,
          goal_note: this.goalsNote,
          misc_note: this.miscNote,
        };
        await axios.put(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }/notes`,
          {
            health_note: this.healthMedsNote,
            goal_note: this.goalsNote,
            misc_note: this.miscNote,
          }
        );
      } catch (error) {
        console.error("Error updating notes: ", error);
        this.errorMessage = "Failed to update notes.";
        this.errorDialog = true;
      }
    },
    async getClient() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }`
        );
        const {
          first_name,
          last_name,
          birth_day,
          health_note,
          goal_note,
          misc_note,
        } = response.data[0];
        this.clientFirstName = first_name;
        this.clientLastName = last_name;
        this.clientBirthDay = newBDate(birth_day);
        this.healthMedsNote = health_note;
        this.goalsNote = goal_note;
        this.miscNote = misc_note;
      } catch (error) {
        console.error("Error fetching client data: ", error);
        this.errorMessage = "Failed to fetch client data.";
        this.errorDialog = true;
      }
    },
  },
};
</script>
