const Pool = require("pg").Pool;
const pool = new Pool({
  user: "zacharyjones",
  host: "localhost",
  database: "trainingapp",
  password: "Copal3200!",
  port: 5432,
});
const getClients = (request, response) => {
  pool.query(
    "SELECT * FROM clients_data ORDER BY date DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const addClient = (request, response) => {
  const { client, weight } = request.body;

  pool.query(
    `INSERT INTO clients_data (client_name, weight, date) VALUES ('${client}', ${weight} , CURRENT_DATE)`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
// const createUser = (request, response) => {
//   const { name, email } = request.body;

//   pool.query(
//     "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
//     [name, email],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(`User added with ID: ${results.rows[0].id}`);
//     }
//   );
// };

module.exports = {
  getClients,
  addClient,
};
