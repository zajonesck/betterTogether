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

const protectedRoutes = express.Router();
protectedRoutes.use(verifyJWT); // Apply JWT verification only to protected routes

// Define the login and signup routes first, so they are not affected by JWT verification
app.post("/login");
app.post("/signup");

protectedRoutes.get("/exercises", db.getAllExercises);

protectedRoutes.get("/exercises/:id", db.getExerciseById);

protectedRoutes.get("/clients", db.getClients);

protectedRoutes.get("/client-workouts/:clientId", db.getClientWorkouts);

protectedRoutes.get("/clients/:clientId", db.getClient);

protectedRoutes.get("/clients_weights/:clientId", db.getWeights);

protectedRoutes.delete("/client_workout/:workoutId", db.deleteClientWorkout);

protectedRoutes.get("/workouts", db.getWorkouts);

protectedRoutes.get("/workout/:workoutId", db.getWorkout);

protectedRoutes.post("/clients/workouts", db.addClientWorkout);

protectedRoutes.post("/clients_weights/:clientId", (req, res, next) => {
  if (!req.body.weight) {
    return res.status(400).send("Client weight required.");
  }
  if (isNaN(req.body.weight)) {
    return res.status(400).send("Valid weight required.");
  }
  db.addWeight(req, res);
});

protectedRoutes.post("/search/workouts", db.searchWorkouts);

protectedRoutes.post("/clients", (req, res, next) => {
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
    db.addClient(req, res);
  }
});

protectedRoutes.delete("/test/delete-client/:clientId", (req, res) => {
  const clientId = req.params.clientId;

  deleteClientForTest(clientId)
    .then(() => {
      res.status(200).send("Client deleted successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error deleting client.");
    });
});

protectedRoutes.delete("/clients/:clientId", db.deleteClient);

protectedRoutes.delete("/clients_weights/:weightId", db.deleteWeight);
protectedRoutes.put("/clients/:clientId/notes", (req, res, next) => {
  // You can add validation checks here as needed, similar to what you've done for other routes
  const { health_note, goal_note, misc_note } = req.body;
  if (!health_note && !goal_note && !misc_note) {
    return res.status(400).send("At least one note field is required.");
  }

  // Assuming you have a `updateClientNotes` function in your `db` module
  db.updateClientNotes(req, res);
});
app.use(protectedRoutes);

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

module.exports = app;
