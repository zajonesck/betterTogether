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

