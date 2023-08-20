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
  <v-dialog v-model="errorDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Error</v-card-title>
      <v-card-text>
        {{ errorMessage }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="errorDialog = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="confirmDeleteDialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">Confirm Deletion</v-card-title>
      <v-card-text> Are you sure you want to delete this item? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="proceedToDelete"
          >Yes, Delete</v-btn
        >
        <v-btn text @click="confirmDeleteDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ClientGoal",
  // add relevant props, data, methods, etc.
};
</script>

<!-- Styles, if any -->
<style scoped>
.clickable-header:hover {
  cursor: pointer;
}
.custom-link {
  display: inline-block;
  text-decoration: underline;
  color: inherit; /* This will make the link use the default text color of its parent */
  transition: color 0.3s ease; /* This will smoothly change the color when hovering */
}

.custom-link:hover {
  color: rgba(
    101,
    42,
    127,
    0.7
  ); /* This will darken the color when hovering, change this value to your preference */
}
</style>
