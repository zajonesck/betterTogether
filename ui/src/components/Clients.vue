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
      axios.get("http://localhost:3000/clients").then((response) => {
        this.clients = response.data;
      });
    },
    newDate(birthDay) {
      const date = format(parseISO(birthDay), " MMM, dd, yyyy");
      return date;
    },
    addClient() {
      const requestBody = {
        client_name: this.newClientName,
        birth_day: this.newClientBirthDate,
      };
      axios
        .post("http://localhost:3000/clients", requestBody)
        .then((response) => {
          console.log("copesponse", response);
          this.getClients();
          this.newClientName = "";
          this.newClientBirthDate = "";
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
    </tr>
    <tr v-for="client in clients">
      <td>{{ client.client_name }}</td>
      <td>{{ newDate(client.birth_day) }}</td>
    </tr>
  </table>
  <label>Name </label>
  <input v-model="newClientName" type="text" id="name" placeholder="Mr. Woof" />
  <label>Birth Date </label>
  <input
    v-model="newClientBirthDate"
    type="date"
    id="date"
    placeholder="123-46-6789"
  />
  <button @click="addClient">Add new client.</button>
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
