<script>
import axios from "axios";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      clients: [],
      newClientName: "Name",
      newClientBirthDate: "mm/dd/yyyy",
    };
  },
  mounted() {
    axios.get("http://localhost:3000/clients").then((response) => {
      console.log(response);
      this.clients = response.data;
    });
  },
  methods: {
    newDate(birthDay) {
      const date = format(parseISO(birthDay), " MMM, dd, yyyy");
      return date;
    },
    addClient(client_name, birth_day) {
      const requestBody = {
        client_name: this.newClientName,
        birth_day: this.newClientBirthDate,
      };
      axios
        .post("http://localhost:3000/clients", requestBody)
        .then((response) => console.log("copesponse"));
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
  <input v-model="newClientName" type="text" id="name" name="name" size="10" />
  <label>Birth Date </label>
  <input v-model="newClientBirthDate" type="text" id="date" name="birth date" />
  <button @click="addClient">Add new client.</button>
</template>
<style scoped>
h1 {
  color: red;
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
</style>
