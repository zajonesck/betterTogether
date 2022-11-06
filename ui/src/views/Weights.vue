<script>
import axios from "axios";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      clientWeights: [],
      newWeight: "",
      newWeighDate: "",
      clientName: "",
      clientBirthDay: "",
      loading: true,
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },

  async mounted() {
    await this.getClient();
    await this.getWeights();
    this.loading = false;
  },

  methods: {
    newDate(weighDay) {
      const date = format(parseISO(weighDay), "MMM dd, yyyy");
      return date;
    },

    getClient() {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}clients/${
            this.$route.params.clientId
          }`
        )
        .then((response) => {
          this.clientName = response.data[0].client_name;
          this.clientBirthDay = response.data[0].birth_day;
        });
    },

    deleteWeight(weightId) {
      console.log("delete");
      console.log(weightId);
      axios
        .delete(`${import.meta.env.VITE_API_URL}clients_weights/${weightId}`)
        .then((response) => {
          this.getWeights();
        });
    },

    newBDate(clientBirthDay) {
      let date = clientBirthDay.split("-");
      let day = date[2].split("", 2).toString().replaceAll(",", "");
      const month = this.months[+date[1] - 1];
      let stringDate = month + " " + day + ", " + date[0];
      return stringDate;
    },

    getWeights() {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}clients_weights/${
            this.$route.params.clientId
          }`
        )
        .then((response) => {
          this.clientWeights = response.data;
        });
    },
  },
};
</script>
<template>
  <div id="app">
    <div v-if="loading">LOADING...cope</div>
    <div v-else>
      <h1>Weights</h1>
      <h2>{{ clientName }} {{ newBDate(clientBirthDay) }}</h2>
      <table>
        <tr>
          <th>Weight</th>
          <th>Date</th>
        </tr>
        <tr v-for="weight in clientWeights">
          <td>
            {{ weight.weight }}
          </td>
          <td>{{ newDate(weight.date) }}</td>

          <td><button @click="deleteWeight(weight.id)">🗑</button></td>
        </tr>
      </table>
      <label>Weight: </label>
      <button @click="addWeight">✔</button>
    </div>
  </div>
</template>
<style scoped></style>
