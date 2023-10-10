const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

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
    throw error;
  }
}

exports.getTestJWT = getTestJWT;
