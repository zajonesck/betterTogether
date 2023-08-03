--client table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(255) NOT NULL,
    birth_day timestamp without time zone NOT NULL
);

-- Indices -------------------------------------------------------



CREATE UNIQUE INDEX clients_data_pkey ON clients(id int4_ops);

--clients weights table

CREATE TABLE clients_weights (
    id SERIAL PRIMARY KEY,
    weight integer NOT NULL,
    date timestamp without time zone NOT NULL,
    client_id integer REFERENCES clients(id)
);
COMMENT ON CONSTRAINT clients_weights_client_id_fkey ON clients_weights IS 'client ID';

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX clients_weights_pkey ON clients_weights(id int4_ops);


-- workouts table

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    workout_name character varying(255) NOT NULL,
    client_id integer NOT NULL REFERENCES clients(id)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX workouts_pkey ON workouts(id int4_ops);

-- body_parts table

CREATE TABLE body_parts (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    bodypart_name character varying(50) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX body_part_pkey ON body_parts(id int4_ops);

-- exercises table

CREATE TABLE exercises (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying(50) NOT NULL,
    description character varying(50) NOT NULL,
    primary_body_part_id character varying(50) NOT NULL,
    secondary_body_part_id character varying(50) NOT NULL,
    "Movement_type" character varying(50) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX exercise_pkey ON exercises(id int4_ops);

-- workouts table

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    workout_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    difficulty pg_enum NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX workout_pkey ON workouts(id int4_ops);

-- workouts_exercises table

CREATE TABLE workouts_exercises (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    workout_id integer NOT NULL REFERENCES workouts(id),
    exercise_id integer NOT NULL REFERENCES exercises(id),
    sets integer NOT NULL,
    reps integer NOT NULL,
    rpe integer NOT NULL
);
COMMENT ON CONSTRAINT workout_exercise_workout_id_fkey ON workouts_exercises IS 'workout.id';
COMMENT ON CONSTRAINT workout_exercise_exercise_id_fkey ON workouts_exercises IS 'exercise.id';

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX workout_exercise_pkey ON workouts_exercises(id int4_ops);



