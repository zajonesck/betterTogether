const Pool = require("pg").Pool;
const { InternalServerError } = require("./ApiError");
require("dotenv").config();

const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

let pool;

async function getDatabaseCredentials() {
  const client = new SecretsManagerClient({ region: "us-east-1" });
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: "prod/betterTogether/postgreSql",
        VersionStage: "AWSCURRENT",
      })
    );
    return JSON.parse(response.SecretString);
  } catch (error) {
    console.error("Error retrieving secret:", error);
    throw new InternalServerError("Failed to retrieve database credentials.");
  }
}

async function initializePool() {
  if (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "test") {
    pool = new Pool({
      user: process.env.LOCAL_USER,
      host: process.env.LOCAL_HOST,
      database: process.env.LOCAL_DATABASE,
      password: process.env.LOCAL_PASSWORD,
      port: process.env.LOCAL_PORT,
    });
  } else {
    const dbCredentials = await getDatabaseCredentials();
    pool = new Pool({
      user: dbCredentials.username,
      host: dbCredentials.host,
      database: dbCredentials.dbname,
      password: dbCredentials.password,
      port: dbCredentials.port,
      ssl: { rejectUnauthorized: false },
    });
  }
}

function getPoolInstance() {
  if (!pool) {
    throw new InternalServerError("Database pool is not initialized.");
  }
  return pool;
}

exports.getPoolInstance = getPoolInstance;
exports.initializePool = initializePool;
