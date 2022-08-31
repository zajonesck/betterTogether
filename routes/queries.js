const Pool = require("pg").Pool;

//local DB connection
const pool = new Pool({
  user: "zacharyjones",
  host: "localhost",
  database: "trainingapp",
  password: "Copal3200!",
  port: 5432,
});

// const pool = new Pool({
//   user: "qacufwqdwaercf",
//   host: "ec2-23-23-151-191.compute-1.amazonaws.com",
//   database: "d5tbsn9k6iejgi",
//   password: "53b9b10b6742d9d09890febc4fd2c44148bc64935e83bd230060b32deaec57d5",
//   port: 5432,
//   ssl: { rejectUnauthorized: false },
// });
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
  console.log("request body here!!!", request.body);
  const { client_name, birth_day } = request.body;

  pool.query(
    "INSERT INTO clients (client_name, birth_day) VALUES($1, $2)",
    [client_name, birth_day],
    (err, res) => {
      if (err) {
        console.log(err);
        return err;
      }
      response.status(200).json(res.rows);
    }
  );
};

module.exports = {
  getClients,
  addClient,
};
