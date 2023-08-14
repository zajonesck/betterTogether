<script>
import axios from "axios";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      clients: [],
      newClientFirstName: "",
      newClientLastName: "",
      newClientBirthDate: "",
      loading: true,
      headers: [
        { text: "ID", value: "id" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Birth Date", value: "birth_day" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      clientToDelete: null,
      searchQuery: "",
      sortAscending: true,
      sortedColumn: "",
    };
  },
  computed: {
    filteredClients() {
      if (!this.searchQuery) {
        return this.clients;
      }
      const query = this.searchQuery.toLowerCase();
      return this.clients.filter(
        (client) =>
          client.first_name.toLowerCase().includes(query) ||
          client.last_name.toLowerCase().includes(query)
      );
    },
  },

  mounted() {
    this.newBDate = newBDate;
    this.getClients();
  },

  methods: {
    getClients() {
      axios
        .get(`${import.meta.env.VITE_API_URL}clients`)
        .then((response) => {
          this.clients = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch clients:", error);
          this.loading = false; // Consider setting an error state here instead
        });
    },

    addClient() {
      const requestBody = {
        first_name: this.newClientFirstName,
        last_name: this.newClientLastName,
        birth_day: this.newClientBirthDate,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}clients`, requestBody)
        .then((response) => {
          this.getClients();
          this.newClientFirstName = "";
          this.newClientLastName = "";
          this.newClientBirthDate = "";
        });
    },

    confirmDelete(clientId) {
      this.clientToDelete = clientId;
      this.dialog = true;
    },

    proceedDelete() {
      this.deleteClient(this.clientToDelete);
      this.dialog = false;
      this.clientToDelete = null;
    },

    deleteClient(clientId) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}clients/${clientId}`)
        .then((response) => {
          this.getClients();
        });
    },

    sortBy(property) {
      if (this.sortedColumn === property) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = true;
      }

      this.clients.sort((a, b) => {
        const textA = a[property]?.toString().toUpperCase() || "";
        const textB = b[property]?.toString().toUpperCase() || "";
        return this.sortAscending
          ? textA.localeCompare(textB)
          : textB.localeCompare(textA);
      });

      this.sortedColumn = property;
    },
  },
};
</script>

<template>
  <v-card-title>Clients</v-card-title>

  <v-container style="min-height: calc(100vh - 250px)">
    <v-text-field
      v-model="searchQuery"
      clearable
      label="Search Clients"
      variant="outlined"
    ></v-text-field>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else>
      <v-table fixed-header>
        <thead>
          <tr>
            <th @click="sortBy('first_name')" class="clickable-header">
              Name
              <v-icon v-if="sortedColumn === 'first_name' && sortAscending"
                >mdi-arrow-down</v-icon
              >
              <v-icon v-else-if="sortedColumn === 'first_name'"
                >mdi-arrow-up</v-icon
              >
              <v-icon v-else>mdi-sort</v-icon>
            </th>
            <th @click="sortBy('birth_day')" class="clickable-header">
              Birth date
              <v-icon v-if="sortedColumn === 'birth_day' && sortAscending"
                >mdi-arrow-down</v-icon
              >
              <v-icon v-else-if="sortedColumn === 'birth_day'"
                >mdi-arrow-up</v-icon
              >
              <v-icon v-else>mdi-sort</v-icon>
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="client in filteredClients" :key="client.id">
            <td>
              <router-link
                :to="{
                  name: 'Weights',
                  params: { clientId: client.id },
                }"
              >
                {{ client.first_name }} {{ client.last_name }}
              </router-link>
            </td>
            <td>{{ newBDate(client.birth_day) }}</td>
            <td>
              <v-btn icon @click="confirmDelete(client.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>
          <v-card-text>
            Are you sure you want to delete this client? This action cannot be
            undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn color="red darken-1" text @click="proceedDelete"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-form>
        <v-card-title style="padding-top: 25px">Add New Client</v-card-title>
        <v-text-field
          v-model="newClientFirstName"
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="newClientLastName"
          label="Last Name"
        ></v-text-field>
        <v-text-field
          v-model="newClientBirthDate"
          label="Birth Date"
          type="date"
        ></v-text-field>
        <v-btn @click="addClient">Add Client</v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<style scoped></style>
