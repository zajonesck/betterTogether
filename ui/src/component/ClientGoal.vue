<template>
  <v-window-item value="goals">
    <div v-for="(label, key) in textFields" :key="key">
      <v-card-title> {{ label.title }} </v-card-title>
      <v-text-field
        v-if="label.type === 'number'"
        v-model="notes[key]"
        :label="label.label"
        type="number"
        @keyup.enter="updateNotes"
      ></v-text-field>
      <v-textarea
        v-else
        v-model="notes[key]"
        :label="label.label"
        @keyup.enter="updateNotes"
      ></v-textarea>
    </div>
    <v-btn @click="updateNotes">Save Notes</v-btn>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top timeout="1500">
      {{ snackbarMessage }}
      <v-btn icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
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
      textFields: {
        healthMedsNote: {
          title: "Health/Meds",
          label: "Add Health/Meds Notes",
          type: "textarea",
        },
        goalsNote: {
          title: "Goals",
          label: "Add Goals",
          type: "textarea",
        },
        goalWeight: {
          title: "Goal weight",
          label: "Enter Goal Weight",
          type: "number",
        },
        miscNote: {
          title: "Misc.",
          label: "Add Misc. Notes",
          type: "textarea",
        },
      },
      errorDialog: false,
      errorMessage: "",
      clientFirstName: "",
      clientLastName: "",
      clientBirthDay: "",
      loading: true,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
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
        this.snackbarMessage = "Notes updated successfully!";
        this.snackbarColor = "success";
      } catch (error) {
        console.error("Error updating notes: ", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.snackbarMessage = error.response.data.errors.join(" ");
        } else {
          this.snackbarMessage = "Failed to update notes. Please try again.";
        }

        this.snackbarColor = "error";
      } finally {
        this.snackbar = true;
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
