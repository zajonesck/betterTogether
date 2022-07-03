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

module.exports = {
  getClients,
};
