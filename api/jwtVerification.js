const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const COGNITO_REGION = process.env.COGNITO_REGION || "us-east-1";
const COGNITO_USER_POOL_ID =
  process.env.COGNITO_USER_POOL_ID || "us-east-1_DcNSKP6oS";
// Set up JWKS client
const client = jwksClient({
  jwksUri: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const route = req.originalUrl;

  if (route === "/login" || route === "/signup") {
    // Don't require token authentication for login and sign in pages
    next();
  } else if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token === process.env.TESTJWT) {
      next();
    } else {
      jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
      });
    }
  } else {
    res.status(401).json({ error: "Authorization token must be provided" });
  }
}
module.exports = {
  verifyJWT,
};
