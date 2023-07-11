<script>
import axios from "axios";
import { newBDate } from "../shared.js";

export default {
  data() {
    return {
      clients: [],
      newClientName: "",
      newClientBirthDate: "",
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
  <div id="app">
    <h1>Clients</h1>
    <table>
      <tr>
        <th>Client</th>
        <th>Birth date</th>
      </tr>
      <tr v-for="client in clients">
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
        <td><button @click="deleteClient(client.id)">🗑</button></td>
      </tr>
    </table>
    <label>Name: </label>
    <input v-model="newClientName" type="text" id="name" placeholder="NAME" />
    <label>Birth Date: </label>
    <input
      v-model="newClientBirthDate"
      type="date"
      id="date"
      placeholder="123-46-6789"
    />
    <button @click="addClient">✔</button>
  </div>
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
