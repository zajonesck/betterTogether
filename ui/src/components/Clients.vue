<script>
import axios from "axios";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      clients: [],
      count: 0,
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

  <button @click="count++">Go do {{ count }} push-ups.</button>
</template>
<style scoped>
h1 {
  color: red;
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
</style>
