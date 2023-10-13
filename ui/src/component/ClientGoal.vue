<template>
  <v-window-item value="goals">
    <div v-for="(label, key) in textAreas" :key="key">
      <v-card-title> {{ label.title }} </v-card-title>
      <v-textarea v-model="notes[key]" :label="label.label"></v-textarea>
    </div>
    <v-btn @click="updateNotes">Save Notes</v-btn>
  </v-window-item>
</template>

<script>
import apiClient from "../../apiClient";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      notes: {
        healthMedsNote: "",
        goalsNote: "",
        goalWeight: "",
        miscNote: "",
      },
      textAreas: {
        healthMedsNote: {
          title: "Health/Meds",
          label: "Add Health/Meds Notes",
        },
        goalsNote: { title: "Goals", label: "Add Goals" },
        goalWeight: { title: "Goal weight", label: "Enter Goal Weight" },
        miscNote: { title: "Misc.", label: "Add Misc. Notes" },
      },
      errorDialog: false,
      errorMessage: "",
      clientFirstName: "",
      clientLastName: "",
      clientBirthDay: "",
      loading: true,
    };
  },

  async mounted() {
    try {
      await this.getClient();
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    } finally {
      this.loading = false;
    }
  },

  methods: {
    async updateNotes() {
      try {
        await apiClient.put(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }/notes`,
          {
            health_note: this.notes.healthMedsNote,
            goal_note: this.notes.goalsNote,
            goal_weight: this.notes.goalWeight,
            misc_note: this.notes.miscNote,
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
        const response = await apiClient.get(
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
          goal_weight,
          misc_note,
        } = response.data[0];

        this.clientFirstName = first_name;
        this.clientLastName = last_name;
        this.clientBirthDay = newBDate(birth_day);
        this.notes.healthMedsNote = health_note;
        this.notes.goalsNote = goal_note;
        this.notes.goalWeight = goal_weight;
        this.notes.miscNote = misc_note;
      } catch (error) {
        console.error("Error fetching client data: ", error);
        this.errorMessage = "Failed to fetch client data.";
        this.errorDialog = true;
      }
    },
  },
};
</script>
