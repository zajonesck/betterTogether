const db = require("./queries");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { nextDay } = require("date-fns");

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

app.get("/clients/:clientId", db.getClient);

app.get("/clients_weights/:clientId", db.getWeights);

app.post("/clients_weights/:clientId", db.addWeight);

app.post("/clients", (req, res, next) => {
  //req.body.client_name = client name
  if (!req.body.client_name) {
    res.status(400).send("Client name required.");
  }
  if (!req.body.birth_day) {
    res.status(400).send("Birthday required.");
  }
  if (Date.parse(req.body.birth_day) < -2208967764000) {
    console.log(Date.parse(req.body.birth_day));
    res.status(400).send("Are you really that old?");
  }
  if (isNaN(Date.parse(req.body.birth_day))) {
    res.status(400).send("Valid birthday required.");
  } else {
    console.log("else");
    console.log(Date.parse(req.body.birth_day));
    db.addClient(req, res);
  }
  //name duplicate, name is null
  //req.body.birth_day - birth day
  //birthday empty string, null, undefined, and "good date", if birthday parameter exists
});

app.delete("/clients/:clientId", db.deleteClient);

app.delete("/clients_weights/:weightId", db.deleteWeight);
