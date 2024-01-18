const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

class SecretRetrievalError extends Error {
  constructor(message) {
    super(message);
    this.name = "SecretRetrievalError";
  }
}

async function getTestJWT() {
  const client = new SecretsManagerClient({ region: "us-east-1" });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: "MyTestSecret",
        VersionStage: "AWSCURRENT",
      })
    );

    const secret = JSON.parse(response.SecretString);
    return secret.TESTJWT;
  } catch (error) {
    console.error("Error retrieving JWT secret:", error);
    throw new SecretRetrievalError("Failed to retrieve JWT secret.");
  }
}
exports.getTestJWT = getTestJWT;
