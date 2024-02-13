// googleAuthHelper.js

import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(
  "375292543080-rj3rj96nv2ts1qv7f5oooc7mbfjsskug.apps.googleusercontent.com"
);

async function exchangeCodeForToken(code) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code: code,
    client_id:
      "375292543080-rj3rj96nv2ts1qv7f5oooc7mbfjsskug.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri:
      "https://bettertogetherauth.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=7nj1rj9l48coem2ogiigf4qj2&redirect_uri=https://bettertogether.day/client-roster",
    //   "https://bettertogetherauth.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=7nj1rj9l48coem2ogiigf4qj2&redirect_uri=http://localhost:5173/client-roster",

    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(url, values);
    return response.data; // This includes access_token, id_token, etc.
  } catch (error) {
    console.error("Error exchanging code for tokens:", error.response.data);
    throw new Error("Failed to exchange code for tokens");
  }
}

async function verifyGoogleToken(idToken) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: idToken,
      audience:
        "375292543080-rj3rj96nv2ts1qv7f5oooc7mbfjsskug.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    return payload; // Contains user's Google profile information
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Failed to verify Google token");
  }
}

function issueCustomJWT(user) {
  const expiresIn = "1d"; // Token expiration time
  const payload = {
    sub: user.id, // Use a unique identifier for the user
    email: user.email, // User's email, if needed
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = jwt.sign(payload, "prod/betterTogether/postgreSql", {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

export { exchangeCodeForToken, verifyGoogleToken, issueCustomJWT };
