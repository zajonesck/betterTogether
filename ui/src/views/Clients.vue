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
      headers: [
        { text: "ID", value: "id" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
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
        first_name: this.newClientFirstName,
        last_name: this.newClientLastName,
        birth_day: this.newClientBirthDate,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}clients`, requestBody)
        .then((response) => {
          console.log(response);
          this.getClients();
          this.newClientFirstName = "";
          this.newClientLastName = "";
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
  <v-container style="min-height: calc(100vh - 100px)">
    <v-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth date</th>
          <th></th>
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
              >{{ client.first_name }} {{ client.last_name }}</router-link
            >
          </td>
          <td>{{ newBDate(client.birth_day) }}</td>
          <td><button @click="deleteClient(client.id)">🗑</button></td>
        </tr>
      </tbody>
    </v-table>
    <v-form>
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
  </v-container>
</template>

<style scoped>
h1 {
  font-weight: 250;
  font-size: 2.6rem;
  text-align: center;
  margin: auto;
  width: 100%;
  padding: 10px;
}

td {
  text-align: left;
}
#app {
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
