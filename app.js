require("dotenv").config();

var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const app = express();

const db = require("./routes/queries");
const bodyParser = require("body-parser");
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
app.get("/exercises", db.getAllExercises);

app.get("/exercises/:id", db.getExerciseById);

app.use(express.static("ui/dist"));

app.get("/clients", db.getClients);

app.get("/client-workouts/:clientId", db.getClientWorkouts);

app.get("/clients/:clientId", db.getClient);

app.get("/clients_weights/:clientId", db.getWeights);

app.get("/workouts", db.getWorkouts);

app.get("/workout/:workoutId", db.getWorkout);

app.post("/clients/workouts", db.addClientWorkout);

app.post("/clients_weights/:clientId", (req, res, next) => {
  if (!req.body.weight) {
    res.status(400).send("Client weight required.");
  }
  if (isNaN(req.body.weight)) {
    res.status(400).send("Valid weight required.");
  } else {
    db.addWeight(req, res);
  }
});

app.post("/search/workouts", db.searchWorkouts);

app.post("/clients", (req, res, next) => {
  //req.body.client_name = client name
  if (!req.body.first_name || !req.body.last_name) {
    res.status(400).send("Client name required.");
  }
  if (!req.body.birth_day) {
    res.status(400).send("Birthday required.");
  }
  if (
    new Date(req.body.birth_day).getFullYear() <
    new Date().getFullYear() - 200
  ) {
    console.log(req.body.birth_day);
    res.status(400).send("Are you really that old?");
  }
  if (isNaN(Date.parse(req.body.birth_day))) {
    res.status(400).send("Valid birthday required.");
  } else {
    db.addClient(req, res);
  }
  //name duplicate, name is null
  //req.body.birth_day - birth day
  //birthday empty string, null, undefined, and "good date", if birthday parameter exists
});

app.delete("/clients/:clientId", db.deleteClient);

app.delete("/clients_weights/:weightId", db.deleteWeight);
app.put("/clients/:clientId/notes", (req, res, next) => {
  // You can add validation checks here as needed, similar to what you've done for other routes
  const { health_note, goal_note, misc_note } = req.body;
  if (!health_note && !goal_note && !misc_note) {
    return res.status(400).send("At least one note field is required.");
  }

  // Assuming you have a `updateClientNotes` function in your `db` module
  db.updateClientNotes(req, res);
});

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

module.exports = app;
