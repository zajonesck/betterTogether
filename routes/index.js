// const db = require("./queries");
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const cors = require("cors");
// const { nextDay } = require("date-fns");

// const port = process.env.PORT || 3000;

// // Add Access Control Allow Origin headers
// app.use(cors());
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.use(express.static("ui/dist"));

// app.get("/clients", db.getClients);

// app.get("/clients/:clientId", db.getClient);

// app.get("/clients_weights/:clientId", db.getWeights);

// app.post("/clients_weights/:clientId", (req, res, next) => {
//   console.log(req.body.weight);
//   if (!req.body.weight) {
//     res.status(400).send("Client weight required.");
//   }
//   if (isNaN(req.body.weight)) {
//     res.status(400).send("Valid weight required.");
//   } else {
//     db.addWeight(req, res);
//   }
// });
// // app.post("/clients", (req, res, next) => {
// //   if (!req.body.first_name || !req.body.last_name) {
// //     res.status(400).send("Client name required.");
// //   }
// //   if (!req.body.birth_day) {
// //     res.status(400).send("Birthday required.");
// //   }
// //   if (
// //     new Date(req.body.birth_day).getFullYear() <
// //     new Date().getFullYear() - 200
// //   ) {
// //     console.log(req.body.birth_day);
// //     res.status(400).send("Are you really that old?");
// //   }
// //   if (isNaN(Date.parse(req.body.birth_day))) {
// //     res.status(400).send("Valid birthday required.");
// //   } else {
// //     db.addClient(req, res);
// //   }
// //   //name duplicate, name is null
// //   //req.body.birth_day - birth day
// //   //birthday empty string, null, undefined, and "good date", if birthday parameter exists
// // });

// app.delete("/clients/:clientId", db.deleteClient);

// app.delete("/clients_weights/:weightId", db.deleteWeight);
