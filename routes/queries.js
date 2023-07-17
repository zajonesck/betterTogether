const { Pool } = require("pg");

const pool = new Pool({
  user: "zacharyjones",
  host: "localhost",
  database: "trainingapp",
  password: "",
  port: 5431,
});

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
  addWeight,
  deleteWeight,
  getClient,
};
