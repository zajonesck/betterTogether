require("dotenv").config();

const Pool = require("pg").Pool;
let pool;

if (process.env.NODE_ENV === "local") {
  pool = new Pool({
    user: process.env.LOCAL_USER,
    host: process.env.LOCAL_HOST,
    database: process.env.LOCAL_DATABASE,
    password: process.env.LOCAL_PASSWORD,
    port: process.env.LOCAL_PORT,
  });
} else {
  pool = new Pool({
    user: process.env.PROD_USER,
    host: process.env.PROD_HOST,
    database: process.env.PROD_DATABASE,
    password: process.env.PROD_PASSWORD,
    port: process.env.PROD_PORT,
    ssl: { rejectUnauthorized: false },
  });
}

const deleteClient = (request, response) => {
  const clientId = request.params.clientId;
  pool.query(
    "DELETE FROM clients WHERE id = $1",
    [clientId],
    (error, results) => {
      if (error) {
        console.log(error);
        return error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getClient = (request, response) => {
  const clientId = request.params.clientId;
  pool.query(
    "SELECT first_name, last_name, birth_day FROM clients WHERE id = $1",
    [clientId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getClients = (request, response) => {
  pool.query(
    "SELECT * FROM clients ORDER BY birth_day DESC",

    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length == 0) {
        console.log("400 ERROR! no clients");
        response.status(400).send("400 ERROR! no clients");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getWorkouts = (request, response) => {
  pool.query(
    `SELECT workouts.id, workouts.workout_name, workouts.description, workouts.difficulty, 
      array_agg(json_build_object(
        'id', exercises.id, 
        'name', exercises.name, 
        'description', exercises.description, 
        'primary_body_part_id', exercises.primary_body_part_id,
        'secondary_body_part_id', exercises.secondary_body_part_id
      )) as exercises 
    FROM workouts 
    INNER JOIN workouts_exercises ON workouts.id = workouts_exercises.workout_id 
    INNER JOIN exercises ON workouts_exercises.exercise_id = exercises.id 
    GROUP BY workouts.id`,
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send("An error occurred");
        return;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getWorkout = (request, response) => {
  const workoutId = request.params.workoutId;

  pool.query(
    `SELECT workouts.workout_name, workouts.description, workouts.difficulty, 
      array_agg(json_build_object(
        'id', exercises.id, 
        'name', exercises.name, 
        'description', exercises.description, 
        'primary_body_part_id', exercises.primary_body_part_id,
        'secondary_body_part_id', exercises.secondary_body_part_id
      )) as exercises 
    FROM workouts 
    INNER JOIN workouts_exercises ON workouts.id = workouts_exercises.workout_id 
    INNER JOIN exercises ON workouts_exercises.exercise_id = exercises.id 
    WHERE workouts.id = $1
    GROUP BY workouts.id`,
    [workoutId],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        response.status(404).json({ message: "Workout not found" });
      } else {
        response.status(200).json(results.rows[0]);
      }
    }
  );
};

const addClient = (request, response) => {
  const { first_name, last_name, birth_day } = request.body;
  pool.query(
    "INSERT INTO clients (first_name, last_name, birth_day) VALUES($1, $2, $3)",
    [first_name, last_name, birth_day],
    (error, results) => {
      if (error) {
        return error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getWeights = (request, response) => {
  const clientId = request.params.clientId;
  pool.query(
    "SELECT * FROM clients_weights WHERE client_id = $1",
    [clientId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addWeight = (request, response) => {
  const clientId = request.params.clientId;
  const weight = request.body.weight;
  pool.query(
    "INSERT INTO clients_weights (weight, date, client_id) VALUES($1, now(), $2)",
    [weight, clientId],
    (error, results) => {
      if (error) {
        console.log(error);
        return error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const deleteWeight = (request, response) => {
  const weightId = request.params.weightId;
  pool.query(
    "DELETE FROM clients_weights WHERE id = $1",
    [weightId],
    (error, results) => {
      if (error) {
        console.log(error);
        return error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getClients,
  addClient,
  deleteClient,
  getWeights,
  getWorkouts,
  getWorkout,
  addWeight,
  deleteWeight,
  getClient,
};
