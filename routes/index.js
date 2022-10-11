const db = require("./queries");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

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

app.use(express.static("ui/dist"));

app.get("/clients", db.getClients);

app.post("/clients", db.addClient);

app.delete("/clients/:clientId", db.deleteClient);
