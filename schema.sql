
CREATE TABLE clients (
    id integer DEFAULT nextval('clients_data_id_seq'::regclass) PRIMARY KEY,
    client_name character varying(50) NOT NULL,
    birth_day timestamp without time zone NOT NULL
);

CREATE UNIQUE INDEX clients_data_pkey ON clients(id int4_ops);

CREATE TABLE clients_weights (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    weight integer NOT NULL,
    date timestamp without time zone NOT NULL,
    client_id integer REFERENCES clients(id)
);
COMMENT ON CONSTRAINT fk_clients_weights_clients_id ON clients_weights IS 'client ID';


CREATE UNIQUE INDEX clients_weights_pkey ON clients_weights(id int4_ops);
