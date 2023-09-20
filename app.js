require("dotenv").config();
const { verifyJWT } = require("./JwtUtils");

const express = require("express");
let path = require("path");
let logger = require("morgan");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
const app = express();

const db = require("./routes/queries");
const bodyParser = require("body-parser");
const cors = require("cors");
const { deleteClientForTest } = require("./routes/queries");

const { nextDay } = require("date-fns");

const port = process.env.PORT || 3000;

// Add Access Control Allow Origin headers
app.use(express.static("ui/dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(verifyJWT);

app.get("/exercises", verifyJWT, db.getAllExercises);

app.get("/exercises/:id", verifyJWT, db.getExerciseById);

app.get("/clients", verifyJWT, db.getClients);

app.get("/client-workouts/:clientId", verifyJWT, db.getClientWorkouts);

app.get("/clients/:clientId", verifyJWT, db.getClient);

app.get("/clients_weights/:clientId", verifyJWT, db.getWeights);

app.delete("/client_workout/:workoutId", verifyJWT, db.deleteClientWorkout);

app.get("/workouts", verifyJWT, db.getWorkouts);

app.get("/workout/:workoutId", verifyJWT, db.getWorkout);

app.post("/clients/workouts", verifyJWT, db.addClientWorkout);

app.post("/clients_weights/:clientId", (req, res, next) => {
  if (!req.body.weight) {
    return res.status(400).send("Client weight required.");
  }
  if (isNaN(req.body.weight)) {
    return res.status(400).send("Valid weight required.");
  }
  verifyJWT, db.addWeight(req, res);
});

app.post("/search/workouts", verifyJWT, db.searchWorkouts);

app.post("/clients", (req, res, next) => {
  if (!req.body.first_name || !req.body.last_name) {
    return res.status(400).send("Client name required.");
  }
  if (!req.body.birth_day) {
    return res.status(400).send("Birthday required.");
  }
  if (
    new Date(req.body.birth_day).getFullYear() <
    new Date().getFullYear() - 200
  ) {
    console.log(req.body.birth_day);
    return res.status(400).send("Are you really that old?");
  }
  if (isNaN(Date.parse(req.body.birth_day))) {
    return res.status(400).send("Valid birthday required.");
  } else {
    verifyJWT, db.addClient(req, res);
  }
});

app.delete("/test/delete-client/:clientId", (req, res) => {
  const clientId = req.params.clientId;

  deleteClientForTest(clientId)
    .then(() => {
      res.status(200).send("Client deleted successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error deleting client.");
    });
});

app.delete("/clients/:clientId", verifyJWT, db.deleteClient);

app.delete("/clients_weights/:weightId", db.deleteWeight);
app.put("/clients/:clientId/notes", (req, res, next) => {
  // You can add validation checks here as needed, similar to what you've done for other routes
  const { health_note, goal_note, misc_note } = req.body;
  if (!health_note && !goal_note && !misc_note) {
    return res.status(400).send("At least one note field is required.");
  }

  // Assuming you have a `updateClientNotes` function in your `db` module
  verifyJWT, db.updateClientNotes(req, res);
});

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

module.exports = app;
