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

  //if (process.env.NODE_ENV == "local") {
//   pool = new Pool({
//     user: "zacharyjones",
//     host: "localhost",
//     database: "trainingapp",
//     password: "Copal3200!",
//     port: 5432,
//   });
// } else {
//   pool = new Pool({
//     user: "qacufwqdwaercf",
//     host: "ec2-23-23-151-191.compute-1.amazonaws.com",
//     database: "d5tbsn9k6iejgi",
//     password:
//       "53b9b10b6742d9d09890febc4fd2c44148bc64935e83bd230060b32deaec57d5",
//     port: 5432,
//     ssl: { rejectUnauthorized: false },
//   });
}
  methods: {
    getClients() {
      axios.get(`${API_URL}/clients`).then((response) => {
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
        .post(`${API_URL}/clients`, requestBody)
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
        .delete(`${API_URL}/clients/${clientId}`)
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
      <th>Delete</th>
    </tr>
    <tr v-for="client in clients">
      <td>{{ client.client_name }}</td>
      <td>{{ newDate(client.birth_day) }}</td>
      <td><button @click="deleteClient(client.id)">Delete Client</button></td>
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
  <button @click="addClient">Add Client</button>
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
