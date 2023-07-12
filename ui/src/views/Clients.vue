<script>
import axios from "axios";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      clients: [],
      newClientName: "",
      newClientBirthDate: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Client Name", value: "client_name" },
        { text: "Birth Date", value: "birth_day" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.newBDate = newBDate;
    this.getClients();
  },

  methods: {
    getClients() {
      axios.get(`${import.meta.env.VITE_API_URL}clients`).then((response) => {
        this.clients = response.data;
      });
    },

    addClient() {
      const requestBody = {
        client_name: this.newClientName,
        birth_day: this.newClientBirthDate,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}clients`, requestBody)
        .then((response) => {
          console.log(response);
          this.getClients();
          this.newClientName = "";
          this.newClientBirthDate = "";
        });
    },

    deleteClient(clientId) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}clients/${clientId}`)
        .then((response) => {
          this.getClients();
        });
    },
  },
};
</script>

<template>
  <v-container>
    <v-toolbar-title>Clients</v-toolbar-title>
    <v-data-table
      :headers="headers"
      :items="clients"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="deleteClient(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-form>
      <v-text-field v-model="newClientName" label="Name"></v-text-field>
      <v-text-field
        v-model="newClientBirthDate"
        label="Birth Date"
        type="date"
      ></v-text-field>
      <v-btn @click="addClient">Add Client</v-btn>
    </v-form>
  </v-container>
</template>
<style scoped>
h1 {
  color: white;
  font-weight: 250;
  font-size: 2.6rem;
  text-align: center;
  margin: auto;
  width: 100%;
  padding: 10px;
}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

td {
  text-align: left;
}
</style>
