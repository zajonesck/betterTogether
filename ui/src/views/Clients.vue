<script>
import axios from "axios";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
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
      errorDialog: false,
      errorMessage: "",
    };
  },
  computed: {
    paginatedClients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredClients.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredClients.length / this.itemsPerPage);
    },

    sortedClients() {
      let clientsCopy = [...this.clients]; // Making a copy so as not to mutate the original array
      if (this.sortedColumn) {
        clientsCopy.sort((a, b) => {
          let result = 0;
          if (a[this.sortedColumn] > b[this.sortedColumn]) result = 1;
          if (a[this.sortedColumn] < b[this.sortedColumn]) result = -1;
          return this.sortAscending ? result : -result; // reverse if descending
        });
      }
      return clientsCopy;
    },
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
          this.sortBy("first_name"); // Automatically sort by first name
          this.loading = false;
          this.errorDialog = false;
        })
        .catch((error) => {
          console.error("Failed to add client:", error);
          this.errorMessage =
            "Failed to fetch clients. Please try again later.";
          this.errorDialog = true; // Open the error dialog
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
          this.errorDialog = false; // Close any error dialog
        })
        .catch((error) => {
          console.error("Failed to add client:", error);
          this.errorMessage =
            "Failed to add the client. Please try again later.";
          this.errorDialog = true; // Open the error dialog
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
          this.errorDialog = false; // Close any error dialog
        })
        .catch((error) => {
          console.error("Failed to delete client:", error);
          this.errorMessage = `Failed to delete the client with ID ${clientId}. Please try again later.`;
          this.errorDialog = true; // Open the error dialog
        });
    },

    sortBy(property) {
      if (this.sortedColumn === property) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortedColumn = property;
        this.sortAscending = true; // default to ascending when changing columns
      }

      this.clients.sort((a, b) => {
        const textA = a[property]?.toString().toUpperCase() || "";
        const textB = b[property]?.toString().toUpperCase() || "";
        return this.sortAscending
          ? textA.localeCompare(textB)
          : textB.localeCompare(textA);
      });
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="errorDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>
          {{ errorMessage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="errorDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            <tr v-for="client in paginatedClients" :key="client.id">
              <td>
                <router-link
                  :to="{
                    name: 'Weights',
                    params: { clientId: client.id },
                  }"
                  class="custom-link"
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

        <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>

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
  </div>
</template>

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
