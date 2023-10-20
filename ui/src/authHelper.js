import { Auth } from "aws-amplify";

async function getToken() {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  } catch (error) {
    console.error("Failed to fetch JWT token", error);
  }
}
function isTokenExpired(jwtToken) {
  const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}
export { getToken, isTokenExpired };
