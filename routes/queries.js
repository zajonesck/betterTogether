const Pool = require("pg").Pool;

let pool;

if (process.env.NODE_ENV == "local") {
  pool = new Pool({
    user: "zacharyjones",
    host: "localhost",
    database: "trainingapp",
    password: "Copal3200!",
    port: 5432,
  });
} else {
  pool = new Pool({
    user: "qacufwqdwaercf",
    host: "ec2-23-23-151-191.compute-1.amazonaws.com",
    database: "d5tbsn9k6iejgi",
    password:
      "53b9b10b6742d9d09890febc4fd2c44148bc64935e83bd230060b32deaec57d5",
    port: 5432,
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
    "SELECT client_name FROM clients WHERE id = $1",
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
      response.status(200).json(results.rows);
    }
  );
};
const addClient = (request, response) => {
  const { client_name, birth_day } = request.body;
  pool.query(
    "INSERT INTO clients (client_name, birth_day) VALUES($1, $2)",
    [client_name, birth_day],
    (error, results) => {
      if (error) {
        console.log(error);
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
