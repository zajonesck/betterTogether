require("dotenv").config();

const express = require("express");
const app = express();
const { initializePool } = require("./database");
const db = require("./queries");
const bodyParser = require("body-parser");
const cors = require("cors");
const { deleteClientForTest } = require("./queries");
const router = express.Router();

const port = process.env.PORT || 3000;

initializePool();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api", router);

router.get("/exercises", db.getAllExercises);

router.get("/exercises/:id", db.getExerciseById);

router.get("/clients", db.getClients);

router.get("/client-workouts/:clientId", db.getClientWorkouts);

router.get("/clients/:clientId", db.getClient);

router.get("/clients_weights/:clientId", db.getWeights);

router.delete("/client_workout/:workoutId", db.deleteClientWorkout);

router.get("/workouts", db.getWorkouts);

router.get("/workout/:workoutId", db.getWorkout);

router.post("/clients/workouts", db.addClientWorkout);

router.post("/clients_weights/:clientId", (req, res, next) => {
  if (!req.body.weight) {
    return res.status(400).send("Client weight required.");
  }
  if (isNaN(req.body.weight)) {
    return res.status(400).send("Valid weight required.");
  }
  db.addWeight(req, res);
});

router.post("/search/workouts", db.searchWorkouts);

router.post("/clients", (req, res, next) => {
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

router.delete("/test/delete-client/:clientId", (req, res) => {
  const clientId = req.params.clientId;

  deleteClientForTest(clientId)
    .then(() => {
      res.status(200).send("Client deleted successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error deleting client.");
    });
});

router.delete("/clients/:clientId", db.deleteClient);

router.delete("/clients_weights/:weightId", db.deleteWeight);
router.put("/clients/:clientId/notes", (req, res, next) => {
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
const awsServerlessExpress = require("aws-serverless-express");

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};

exports.app = app;
