const express = require("express");
const cors = require("cors");
const { initializePool } = require("./database");
const db = require("./queries");
const { deleteClientForTest } = require("./queries");
const { verifyJWT } = require("./jwtVerification");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("./APIError");
const awsServerlessExpress = require("aws-serverless-express");

const app = express();

initializePool().catch((error) => {
  console.error("Failed to initialize the database pool", error);
});

app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

const jwtProtectedRouter = express.Router();
jwtProtectedRouter.use(verifyJWT);

jwtProtectedRouter.delete("/clients_weights/:weightId", db.deleteWeight);

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
    return next(new BadRequestError("Client weight required."));
  }
  if (isNaN(req.body.weight)) {
    return next(new BadRequestError("Valid weight required."));
  }
  db.addWeight(req, res);
});

jwtProtectedRouter.post("/search/workouts", db.searchWorkouts);

jwtProtectedRouter.post("/clients", (req, res, next) => {
  if (!req.body.first_name || !req.body.last_name) {
    return next(new BadRequestError("Client name required."));
  }
  if (!req.body.birth_day) {
    return next(new BadRequestError("Birthday required."));
  }
  if (
    new Date(req.body.birth_day).getFullYear() <
    new Date().getFullYear() - 200
  ) {
    return next(new BadRequestError("Are you really that old???"));
  }
  if (isNaN(Date.parse(req.body.birth_day))) {
    return next(new BadRequestError("Valid birthday required."));
  } else {
    db.addClient(req, res);
  }
});

jwtProtectedRouter.delete("/test/delete-client/:clientId", (req, res, next) => {
  const clientId = req.params.clientId;

  deleteClientForTest(clientId)
    .then(() => {
      res.status(200).send("Client deleted successfully.");
    })
    .catch((err) => {
      next(new InternalServerError("Error deleting client."));
    });
});

jwtProtectedRouter.delete("/clients/:clientId", db.deleteClient);

jwtProtectedRouter.put("/clients/:clientId/notes", async (req, res, next) => {
  const { health_note, goal_note, misc_note, goal_weight } = req.body;
  if (!health_note && !goal_note && !misc_note && !goal_weight) {
    return next(new BadRequestError("At least one field is required."));
  }
  try {
    await db.updateClientNotes(req, res, next);
  } catch (error) {
    next(error);
  }
});

const router = express.Router();
router.use("/api", jwtProtectedRouter);
app.use(router);

app.use((err, req, res, next) => {
  const status =
    err instanceof BadRequestError
      ? 400
      : err instanceof NotFoundError
      ? 404
      : err instanceof InternalServerError
      ? 500
      : 500;
  const message = err.message || "An unexpected error occurred";
  res.status(status).json({ error: message });
});

const server = awsServerlessExpress.createServer(app);

exports.handler = async (event, context) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  try {
    await initializePool();
    return awsServerlessExpress.proxy(server, event, context, "PROMISE")
      .promise;
  } catch (error) {
    console.error("Database initialization failed", error);
  }
};

exports.app = app;
