<script>
import axios from "axios";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      clients: [],
      newClientName: "",
      newClientBirthDate: "",
    };
  },
  mounted() {
    this.getClients();
  },

  methods: {
    getClients() {
      console.log("cope", import.meta.env.VITE_API_URL);
      axios.get(`${import.meta.env.VITE_API_URL}clients`).then((response) => {
        console.log("response", response);
        this.clients = response.data;
      });
    },
    newDate(birthDay) {
      const date = format(parseISO(birthDay), "MMM do yyyy");
      return date;
      const dtDateOnly = date(
        date.valueOf() + date.getTimezoneOffset() * 60 * 1000
      );
      return dtDateOnly;
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
      console.log("delete");
      console.log(clientId);
      axios
        .delete(`${import.meta.env.VITE_API_URL}clients/${clientId}`)
        .then((response) => {
          console.log(response);
          this.getClients();
        });
    },
  },
};
</script>

<template>
  <h1>Clients</h1>
  <table>
    <tr>
      <th>Client</th>
      <th>Birth date</th>
      <th></th>
    </tr>
    <tr v-for="client in clients">
      <td>
        {{ client.client_name }}
      </td>
      <td>{{ newDate(client.birth_day) }}</td>
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
</template>
<style scoped>
h1 {
  color: red;
  font-weight: 500;
  font-size: 2.6rem;
  text-align: center;
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>
