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
    <v-table theme="dark">
      <thead>
        <tr>
          <th>Client</th>
          <th>Birth date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>
            <router-link
              :to="{
                name: 'Weights',
                params: { clientId: client.id },
              }"
              >{{ client.client_name }}</router-link
            >
          </td>
          <td>{{ newBDate(client.birth_day) }}</td>
          <td><v-btn @click="deleteClient(client.id)">🗑</v-btn></td>
        </tr>
      </tbody>
    </v-table>
    <v-table
      :headers="headers"
      :items="clients"
      item-key="id"
      class="elevation-1"
    >
    </v-table>
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
