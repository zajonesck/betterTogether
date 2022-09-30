const db = require("./queries");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");

const port = process.env.PORT || 3000;

// Add Access Control Allow Origin headers
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres trainingapp" });
});

app.get("/clients", db.getClients);

app.post("/clients", db.addClient);

app.delete("/clients/:clientId", db.deleteClient);
