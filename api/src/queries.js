const { getPoolInstance } = require("./database");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("./APIError");

const createWorkout = async (name, description, difficulty) => {
  const query =
    "INSERT INTO workouts (workout_name, description, difficulty) VALUES ($1, $2, $3) RETURNING *";
  const values = [name, description, difficulty];
  const { rows } = await getPoolInstance().query(query, values);
  return rows[0];
};

const deleteExerciseFromWorkout = async (workoutId, exerciseId) => {
  const pool = getPoolInstance();
  try {
    const results = await pool.query(
      "DELETE FROM workouts_exercises WHERE workout_id = $1 AND exercise_id = $2 RETURNING *",
      [workoutId, exerciseId]
    );
    if (results.rowCount === 0) {
      throw new Error("Exercise not found in the workout.");
    }
    return results.rows[0];
  } catch (error) {
    console.error("Error executing deleteExerciseFromWorkout query:", error);
    throw new Error(
      "An error occurred during the exercise removal from the workout."
    );
  }
};

const deleteClient = async (request, response, next) => {
  const clientId = request.params.clientId;
  const pool = getPoolInstance();
  try {
    const results = await pool.query("DELETE FROM clients WHERE id = $1", [
      clientId,
    ]);
    if (results.rowCount === 0) {
      return next(new NotFoundError("Client not found."));
    }
    response.status(200).json({ message: "Client deleted successfully." });
  } catch (error) {
    next(new InternalServerError("Error deleting client."));
  }
};

const deleteClientForTest = async (clientId) => {
  const pool = getPoolInstance();
  try {
    const results = await pool.query("DELETE FROM clients WHERE id = $1", [
      clientId,
    ]);
    if (results.rowCount === 0) {
      throw new Error("Client not found or already deleted.");
    }
    return results.rows;
  } catch (error) {
    console.error("Error executing deleteClientForTest query:", error);
    throw new Error("An error occurred during the test client deletion.");
  }
};

const getClient = async (request, response, next) => {
  const clientId = request.params.clientId;
  const pool = getPoolInstance();
  try {
    const results = await pool.query(
      "SELECT first_name, last_name, birth_day, health_note, goal_note, goal_weight, misc_note FROM clients WHERE id = $1",
      [clientId]
    );
    if (results.rows.length === 0) {
      return next(new NotFoundError("Client not found."));
    }
    response.status(200).json(results.rows);
  } catch (error) {
    next(new InternalServerError("Error retrieving client."));
  }
};

const getClients = async (request, response, next) => {
  const pool = getPoolInstance();
  try {
    const results = await pool.query(
      "SELECT * FROM clients ORDER BY birth_day DESC"
    );
    if (results.rows.length === 0) {
      response.status(200).json({ message: "No clients found.", clients: [] });
    } else {
      response.status(200).json(results.rows);
    }
  } catch (error) {
    next(new InternalServerError("Error retrieving clients."));
  }
};

const addClientWorkout = async (request, response, next) => {
  const { client_id, workout_id, notes, date } = request.body;

  if (!workout_id) {
    return next(new BadRequestError("workout_id is required."));
  }
  if (!client_id) {
    return next(new BadRequestError("client_id is required."));
  }
  if (!date) {
    return next(new BadRequestError("date is required."));
  }

  const pool = getPoolInstance();
  try {
    const results = await pool.query(
      "INSERT INTO client_workout (client_id, workout_id, notes, date) VALUES($1, $2, $3, $4) RETURNING id",
      [client_id, workout_id, notes, date]
    );

    response.status(201).json({
      id: results.rows[0].id,
      message: "Client workout added successfully!",
    });
  } catch (error) {
    console.error("Error executing addClientWorkout query:", error);
    next(
      new InternalServerError(
        "An unknown error occurred while adding the client workout."
      )
    );
  }
};

const getWorkouts = async (request, response, next) => {
  const pool = getPoolInstance();
  try {
    const results = await pool.query(
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
      GROUP BY workouts.id`
    );
    response.status(200).json(results.rows);
  } catch (error) {
    next(new InternalServerError("An error occurred while fetching workouts."));
  }
};

const getClientWorkouts = async (request, response, next) => {
  const clientId = parseInt(request.params.clientId);
  const pool = getPoolInstance();

  try {
    const results = await pool.query(
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
      [clientId]
    );

    if (results.rows.length === 0) {
      return response
        .status(200)
        .json({ message: "No workouts found for this client.", workouts: [] });
    }

    response.status(200).json(results.rows);
  } catch (error) {
    console.error("Error executing getClientWorkouts query:", error);
    next(
      new InternalServerError(
        "An error occurred while fetching client workouts."
      )
    );
  }
};

const getWorkout = async (request, response, next) => {
  const workoutId = request.params.workoutId;
  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      `
      SELECT workouts.workout_name, workouts.description, workouts.difficulty, 
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
      [workoutId]
    );

    if (results.rows.length === 0) {
      return next(new NotFoundError("Workout not found"));
    }

    response.status(200).json(results.rows[0]);
  } catch (error) {
    next(
      new InternalServerError("An error occurred while fetching the workout.")
    );
  }
};

const addClient = async (request, response, next) => {
  const {
    first_name,
    last_name,
    birth_day,
    health_note,
    goal_note,
    misc_note,
    goal_weight,
  } = request.body;

  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      "INSERT INTO clients (first_name, last_name, birth_day, health_note, goal_note, misc_note, goal_weight) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        first_name,
        last_name,
        birth_day,
        health_note,
        goal_note,
        misc_note,
        goal_weight,
      ]
    );

    response.status(201).json(results.rows[0]);
  } catch (error) {
    next(new InternalServerError("An error occurred while adding the client."));
  }
};

const searchWorkouts = async (request, response, next) => {
  const { difficulty } = request.body;
  const pool = getPoolInstance();

  try {
    const results = await pool.query(
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
      [difficulty]
    );
    if (results.rows.length === 0) {
      response.status(200).json({
        message: "No workouts found for the specified difficulty.",
        workouts: [],
      });
    } else {
      response.status(200).json(results.rows);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error executing searchWorkouts query:", error);
    next(
      new InternalServerError("An error occurred while searching for workouts.")
    );
  }
};

const getWeights = async (request, response, next) => {
  const clientId = request.params.clientId;
  const pool = getPoolInstance();

  try {
    const numericClientId = parseInt(clientId, 10);
    if (isNaN(numericClientId)) {
      return next(new BadRequestError("Client ID must be a number."));
    }

    const results = await pool.query(
      "SELECT * FROM clients_weights WHERE client_id = $1",
      [numericClientId]
    );
    response.status(200).json(results.rows);
  } catch (error) {
    next(
      new InternalServerError("An error occurred while retrieving weights.")
    );
  }
};

const addWeight = async (request, response, next) => {
  const clientId = request.params.clientId;
  const weight = request.body.weight;
  const pool = getPoolInstance();

  if (!weight || isNaN(weight) || weight <= 0) {
    return next(new BadRequestError("Valid weight is required."));
  }

  try {
    const results = await pool.query(
      "INSERT INTO clients_weights (weight, date, client_id) VALUES($1, now(), $2) RETURNING *",
      [weight, clientId]
    );

    response.status(201).json(results.rows[0]);
  } catch (error) {
    console.error("Error executing addWeight query:", error);
    next(new InternalServerError("An error occurred while adding the weight."));
  }
};

const deleteWeight = async (request, response, next) => {
  const weightId = request.params.weightId;
  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      "DELETE FROM clients_weights WHERE id = $1 RETURNING *",
      [weightId]
    );

    if (results.rowCount === 0) {
      return next(new NotFoundError("Weight entry not found."));
    }

    response.status(200).json({
      message: "Weight entry deleted successfully.",
      deletedWeightDetails: results.rows[0],
    });
  } catch (error) {
    console.error("Error executing deleteWeight query:", error);
    next(
      new InternalServerError(
        "An error occurred while deleting the weight entry."
      )
    );
  }
};

const deleteClientWorkout = async (request, response, next) => {
  const workoutId = parseInt(request.params.workoutId, 10);

  if (isNaN(workoutId)) {
    return next(new BadRequestError("Invalid workout ID."));
  }

  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      "DELETE FROM client_workout WHERE id = $1 RETURNING *",
      [workoutId]
    );

    if (results.rowCount === 0) {
      return next(new NotFoundError("Workout not found."));
    }

    response.status(200).json({
      message: "Workout deleted successfully.",
      deletedWorkoutDetails: results.rows[0],
    });
  } catch (error) {
    next(
      new InternalServerError("An error occurred while deleting the workout.")
    );
  }
};

const getExerciseById = async (request, response, next) => {
  const id = parseInt(request.params.id, 10);

  if (isNaN(id)) {
    return next(new BadRequestError("Invalid exercise ID."));
  }

  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      `SELECT e.id, e.name, e.description, e.example_link,
              bp1.body_part_name as primary_body_part, 
              bp2.body_part_name as secondary_body_part
       FROM exercises e
       LEFT JOIN body_parts bp1 ON e.primary_body_part_id = bp1.id
       LEFT JOIN body_parts bp2 ON e.secondary_body_part_id = bp2.id
       WHERE e.id = $1`,
      [id]
    );

    if (results.rows.length === 0) {
      return next(new NotFoundError("Exercise not found."));
    }

    response.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error executing getExerciseById query:", error);
    next(
      new InternalServerError(
        "An error occurred while retrieving the exercise."
      )
    );
  }
};

const getAllExercises = async (request, response, next) => {
  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      `SELECT e.id, e.name, e.description, e.example_link,
              bp1.body_part_name as primary_body_part, 
              bp2.body_part_name as secondary_body_part
       FROM exercises e
       LEFT JOIN body_parts bp1 ON e.primary_body_part_id = bp1.id
       LEFT JOIN body_parts bp2 ON e.secondary_body_part_id = bp2.id`
    );
    response
      .status(200)
      .json(
        results.rows.length > 0
          ? results.rows
          : { message: "No exercises found." }
      );
  } catch (error) {
    console.error("Error executing getAllExercises query:", error);
    next(
      new InternalServerError("An error occurred while fetching the exercises.")
    );
  }
};

// Function to link an exercise to a workout in the workouts_exercises table
const addExerciseToWorkout = async (
  workoutId,
  exerciseId,
  sets,
  reps,
  rpe,
  duration,
  order
) => {
  const query =
    'INSERT INTO workouts_exercises (workout_id, exercise_id, sets, reps, rpe, duration, "order") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [workoutId, exerciseId, sets, reps, rpe, duration, order];
  const { rows } = await getPoolInstance().query(query, values);
  return rows[0];
};

const updateClientNotes = async (request, response, next) => {
  const clientId = request.params.clientId;
  const { health_note, goal_note, misc_note, goal_weight } = request.body;

  if (!health_note && !goal_note && !misc_note && !goal_weight) {
    return next(new BadRequestError("No data provided to update."));
  }

  const pool = getPoolInstance();

  try {
    const results = await pool.query(
      "UPDATE clients SET health_note = $1, goal_note = $2, misc_note = $3, goal_weight = $4 WHERE id = $5 RETURNING *",
      [health_note, goal_note, misc_note, goal_weight, clientId]
    );

    if (results.rowCount === 0) {
      return next(new NotFoundError("Client not found."));
    }

    response.status(200).json({
      message: "Client notes updated successfully.",
      client: results.rows[0],
    });
  } catch (error) {
    console.error("Error executing updateClientNotes query:", error);
    next(
      new InternalServerError(
        "An error occurred while updating the client notes."
      )
    );
  }
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
  deleteExerciseFromWorkout,
  createWorkout,
  addExerciseToWorkout,
};
