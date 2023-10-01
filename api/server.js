const { app } = require("./src/index");
const { initializePool } = require("./src/database");

const port = process.env.PORT || 3000;

// Immediately call initializePool when this file is loaded.
async function startServer() {
  await initializePool();
  app.listen(port, () => {});
}

startServer();
