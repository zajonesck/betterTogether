require("dotenv").config();
const { getToken } = require("../../ui/src/authHelper");

const Pool = require("pg").Pool;
let pool;

if (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "test") {
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

const deleteClientForTest = (clientId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM clients WHERE id = $1",
      [clientId],
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getClient = (request, response) => {
  const clientId = request.params.clientId;
  pool.query(
    "SELECT first_name, last_name, birth_day, health_note, goal_note, misc_note FROM clients WHERE id = $1",
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

const addClientWorkout = (request, response) => {
  const { client_id, workout_id, notes, date } = request.body;

  if (!workout_id) {
    return response.status(400).send("workout_id is required.");
  }
  if (!client_id) {
    return response.status(400).send("client_id is required.");
  }
  if (!date) {
    return response.status(400).send("date is required.");
  }

  pool.query(
    "INSERT INTO client_workout (client_id, workout_id, notes, date) VALUES($1, $2, $3, $4) RETURNING id",
    [client_id, workout_id, notes, date],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(400).send("An unkown error occurred");
        return;
      }
      response.status(201).json({
        id: results.rows[0].id,
        message: "Client workout added successfully!",
      });
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

const getClientWorkouts = (request, response) => {
  const clientId = parseInt(request.params.clientId);

  pool.query(
    `
    SELECT 
    cw.id AS client_workout_id,
    cw.workout_id, 
    w.workout_name,
    w.description,
    w.difficulty,
    cw.notes, 
    cw.date,
    array_agg(
      json_build_object(
        'exercise_id', we.exercise_id,
        'sets', we.sets,
        'reps', we.reps,
        'rpe', we.rpe,
        'duration', we.duration,
        'order', we."order",
        'exercise_name', e.name,
        'exercise_description', e.description
      )
    ) as exercises
  FROM client_workout cw
  LEFT JOIN workouts_exercises we ON cw.workout_id = we.workout_id
  LEFT JOIN exercises e ON we.exercise_id = e.id
  LEFT JOIN workouts w ON cw.workout_id = w.id
  WHERE cw.client_id = $1
  GROUP BY cw.id, cw.workout_id, cw.notes, cw.date, w.workout_name, w.description, w.difficulty
  ORDER BY cw.date DESC
    `,
    [clientId],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        response
          .status(404)
          .json({ message: "No workouts found for this client." });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

function getWorkout(request, response) {
  const workoutId = request.params.workoutId;

  pool.query(
    `SELECT workouts.workout_name, workouts.description, workouts.difficulty, 
      array_agg(json_build_object(
        'id', exercises.id, 
        'name', exercises.name, 
        'description', exercises.description, 
        'primary_body_part_id', exercises.primary_body_part_id,
        'secondary_body_part_id', exercises.secondary_body_part_id,
        'sets', workouts_exercises.sets,
        'reps', workouts_exercises.reps,
        'rpe', workouts_exercises.rpe,
        'duration', workouts_exercises.duration,
        'order', workouts_exercises.order
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
}

const addClient = (request, response) => {
  const {
    first_name,
    last_name,
    birth_day,
    health_note,
    goal_note,
    misc_note,
  } = request.body;

  pool.query(
    "INSERT INTO clients (first_name, last_name, birth_day, health_note, goal_note, misc_note) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [first_name, last_name, birth_day, health_note, goal_note, misc_note],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send("An error occurred while adding the client.");
        return;
      }
      // Send back the newly added client's data.
      response.status(201).json(results.rows[0]);
    }
  );
};

const searchWorkouts = (request, response) => {
  const { difficulty } = request.body;

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
      WHERE workouts.difficulty = $1
      GROUP BY workouts.id`,
    [difficulty],
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

const deleteClientWorkout = (request, response) => {
  const workoutId = parseInt(request.params.workoutId);
  pool.query(
    "DELETE FROM client_workout WHERE id = $1",
    [workoutId],
    (error, results) => {
      if (error) {
        console.log(error);
        response
          .status(500)
          .send("An error occurred while deleting the workout.");
        return;
      }
      if (results.rowCount === 0) {
        // if no rows were deleted
        response.status(404).send("Workout not found.");
        return;
      }
      response.status(200).send("Workout deleted successfully.");
    }
  );
};

const getExerciseById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    `SELECT e.id, e.name, e.description, e.example_link,
            bp1.body_part_name as primary_body_part, 
            bp2.body_part_name as secondary_body_part
     FROM exercises e
     LEFT JOIN body_parts bp1 ON e.primary_body_part_id = bp1.id
     LEFT JOIN body_parts bp2 ON e.secondary_body_part_id = bp2.id
     WHERE e.id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(404).send("Exercise not found");
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};

const getAllExercises = (request, response) => {
  pool.query(
    `SELECT e.id, e.name, e.description, e.example_link,
            bp1.body_part_name as primary_body_part, 
            bp2.body_part_name as secondary_body_part
     FROM exercises e
     LEFT JOIN body_parts bp1 ON e.primary_body_part_id = bp1.id
     LEFT JOIN body_parts bp2 ON e.secondary_body_part_id = bp2.id`,
    [],
    (error, results) => {
      if (error) {
        console.log(error);
        response
          .status(500)
          .send("An error occurred while fetching the exercises");
        return;
      }
      if (results.rows.length === 0) {
        response.status(404).json({ message: "No exercises found." });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};
const updateClientNotes = (req, res) => {
  const clientId = req.params.clientId;
  const { health_note, goal_note, misc_note } = req.body;

  if (!health_note && !goal_note && !misc_note) {
    return res.status(400).send("No data provided to update.");
  }

  pool.query(
    "UPDATE clients SET health_note = $1, goal_note = $2, misc_note = $3 WHERE id = $4",
    [health_note, goal_note, misc_note, clientId],
    (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send("An error occurred while updating the client notes.");
      }

      if (results.rowCount === 0) {
        // if no rows were updated
        return res.status(404).send("Client not found.");
      }

      res.status(200).send("Client notes updated successfully.");
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
  searchWorkouts,
  addWeight,
  deleteWeight,
  getClient,
  addClientWorkout,
  getClientWorkouts,
  getAllExercises,
  updateClientNotes,
  getExerciseById,
  deleteClientWorkout,
  deleteClientForTest,
};
