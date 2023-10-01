// authHelper.js

const { Auth } = require("aws-amplify");

async function getToken() {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  } catch (error) {
    console.error("Failed to fetch JWT token", error);
  }
}

module.exports = {
  getToken,
};
