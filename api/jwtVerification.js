const jwt = require("jsonwebtoken");
const { getTestJWT } = require("./src/testJWTSecret");
const jwksClient = require("jwks-rsa");
const COGNITO_REGION = process.env.COGNITO_REGION || "us-east-1";
const COGNITO_USER_POOL_ID =
  process.env.COGNITO_USER_POOL_ID || "us-east-1_DcNSKP6oS";

const client = jwksClient({
  jwksUri: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Authorization token must be provided" });
  }

  const token = authHeader.split(" ")[1];

  if (await isValidTestToken(token)) {
    return next();
  }

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

async function isValidTestToken(token) {
  return (
    (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "test") &&
    token === (await getTestJWT())
  );
}

module.exports = {
  verifyJWT,
};
