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
    body_part_name character varying(50) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX body_part_pkey ON body_parts(id int4_ops);

-- exercises table

CREATE TABLE exercises (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying(50) NOT NULL,
    description character varying(255) NOT NULL,
    primary_body_part_id integer NOT NULL REFERENCES body_parts(id),
    secondary_body_part_id integer REFERENCES body_parts(id)
);
COMMENT ON CONSTRAINT exercises_primary_body_part_id_fkey ON exercises IS 'primary body part';
COMMENT ON CONSTRAINT exercises_secondary_body_part_id_fkey ON exercises IS 'secondary body part';


-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX exercise_pkey ON exercises(id int4_ops);

-- workouts table

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    workout_name character varying(50) NOT NULL,
    description character varying(255) NOT NULL,
    difficulty text CHECK (difficulty = ANY (ARRAY['Begineer'::text, 'Intermediate'::text, 'Advanced'::text]))
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX workout_pkey ON workouts(id int4_ops);

-- workouts_exercises table

CREATE TABLE workouts_exercises (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    workout_id integer NOT NULL REFERENCES workouts(id),
    exercise_id integer NOT NULL REFERENCES exercises(id),
    sets character varying(50),
    reps character varying(50),
    rpe character varying(50),
    duration character varying(50)
);
COMMENT ON CONSTRAINT workout_exercise_workout_id_fkey ON workouts_exercises IS 'workout.id';
COMMENT ON CONSTRAINT workout_exercise_exercise_id_fkey ON workouts_exercises IS 'exercise.id';

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX workout_exercise_pkey ON workouts_exercises(id int4_ops);

-- Body part creation
INSERT INTO body_parts (body_part_name) VALUES ('Chest');
INSERT INTO body_parts (body_part_name) VALUES ('Hamstrings');
INSERT INTO body_parts (body_part_name) VALUES ('Biceps');
INSERT INTO body_parts (body_part_name) VALUES ('Quads');
INSERT INTO body_parts (body_part_name) VALUES ('Triceps');
INSERT INTO body_parts (body_part_name) VALUES ('Abs');
INSERT INTO body_parts (body_part_name) VALUES ('Glutes');
INSERT INTO body_parts (body_part_name) VALUES ('Deltoids');
INSERT INTO body_parts (body_part_name) VALUES ('Traps');
INSERT INTO body_parts (body_part_name) VALUES ('Lower Back');

--making exercises
INSERT INTO exercises (name, description, primary_body_part_id) 
VALUES 
('Bicep Curl', 'Barbell curl', 5),
('Tricep Extension', 'Cable tricep pushdown with a rope', 7),
('Plank', 'Plank from top of push-up position', 8),
('Leg extension', 'Squeeze quads at the top of leg extension machine', 6);


INSERT INTO exercises (name, description, primary_body_part_id, secondary_body_part_id) 
VALUES 
('Bench Press', 'Flat babell bench with feet on ground', 4, 7),
('Squat', 'A lower body exercise that targets the thighs and glutes', 6, 3),
('Shoulder Press', 'Standing barbell overhead press', 10, 7),
('Romanian Deadlifts', 'Straight leg deadlift targeting hamstrings', 3, 9);

--making workouts
INSERT INTO workouts (workout_name, description, difficulty) 
VALUES 
('Upper Body', 'A comprehensive workout for the upper body', 'Intermediate'),
('Leg Day Bro', 'A leg focused workout', 'Advanced');

--making workouts_exercises

INSERT INTO workouts_exercises (workout_id, exercise_id, sets, reps, rpe) 
VALUES 
(1, 3, '4', '10', '8'),
(1, 5, '4', '5', '7'),
(1, 2, '4', '12', '7'),
(1, 1, '4', '12', '7'),
(2, 4, '4', '10', '8'),
(2, 6, '3', '15', '7'),
(2, 8, '4', '12', '7');
INSERT INTO workouts_exercises (workout_id, exercise_id, sets, rpe, duration) 
VALUES 
(2, 7, '4', '7', '60 seconds');

-- Drop the existing constraint
ALTER TABLE clients_weights DROP CONSTRAINT clients_weights_client_id_fkey;


-- Recreate the foreign key constraint with CASCADE DELETE

ALTER TABLE clients_weights 
ADD CONSTRAINT clients_weights_client_id_fkey 
FOREIGN KEY (client_id) 
REFERENCES clients(id) 
ON DELETE CASCADE;


