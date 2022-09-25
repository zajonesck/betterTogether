<script>
import axios from "axios";
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
      <td>{{ client.birth_day }}</td>
    </tr>
  </table>

  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
