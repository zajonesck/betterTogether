const express = require("express");
const app = express();
const { initializePool } = require("./database");
const db = require("./queries");
const bodyParser = require("body-parser");
const cors = require("cors");
const { deleteClientForTest } = require("./queries");
const router = express.Router();
const { verifyJWT } = require("./jwtVerification");

initializePool();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// does not require JWT verifacation
app.use("/api", router);

//require JWT verifacation
const jwtProtectedRouter = express.Router();
router.use(jwtProtectedRouter);
jwtProtectedRouter.use(verifyJWT);

jwtProtectedRouter.get("/exercises", db.getAllExercises);

jwtProtectedRouter.get("/exercises/:id", db.getExerciseById);

jwtProtectedRouter.get("/clients", db.getClients);

jwtProtectedRouter.get("/client-workouts/:clientId", db.getClientWorkouts);

jwtProtectedRouter.get("/clients/:clientId", db.getClient);

jwtProtectedRouter.get("/clients_weights/:clientId", db.getWeights);

jwtProtectedRouter.delete("/client_workout/:workoutId", db.deleteClientWorkout);

jwtProtectedRouter.get("/workouts", db.getWorkouts);

jwtProtectedRouter.get("/workout/:workoutId", db.getWorkout);

jwtProtectedRouter.post("/clients/workouts", db.addClientWorkout);

jwtProtectedRouter.post("/clients_weights/:clientId", (req, res, next) => {
  if (!req.body.weight) {
    return res.status(400).send("Client weight required.");
  }
  if (isNaN(req.body.weight)) {
    return res.status(400).send("Valid weight required.");
  }
  db.addWeight(req, res);
});

jwtProtectedRouter.post("/search/workouts", db.searchWorkouts);

jwtProtectedRouter.post("/clients", (req, res, next) => {
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

jwtProtectedRouter.delete("/test/delete-client/:clientId", (req, res) => {
  const clientId = req.params.clientId;

  deleteClientForTest(clientId)
    .then(() => {
      res.status(200).send("Client deleted successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error deleting client.");
    });
});

jwtProtectedRouter.delete("/clients/:clientId", db.deleteClient);

jwtProtectedRouter.delete("/clients_weights/:weightId", db.deleteWeight);
jwtProtectedRouter.put("/clients/:clientId/notes", (req, res, next) => {
  const { health_note, goal_note, misc_note } = req.body;
  if (!health_note && !goal_note && !misc_note) {
    return res.status(400).send("At least one note field is required.");
  }

  db.updateClientNotes(req, res);
});

const awsServerlessExpress = require("aws-serverless-express");

const server = awsServerlessExpress.createServer(app);

exports.handler = async (event, context) => {
  console.log(`event: ${JSON.stringify(event)}`);
  await initializePool(); // Initialize DB connection
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};

exports.app = app;
