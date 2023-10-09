const request = require("supertest");
const { app } = require("../src/index");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { getTestJWT } = require("../src/secret");

let TESTJWT;

describe("GET /clients", () => {
  beforeAll(async () => {
    try {
      TESTJWT = await getTestJWT();
    } catch (err) {
      console.error("Failed to get secret:", err);
      throw err;
    }
  });

  function makeRequest(method, path, token = null) {
    const req = request(app)[method](path);
    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }
    return req;
  }

  test("It responds with an array of clients", async () => {
    const response = await makeRequest("get", "/api/clients", TESTJWT);

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("first_name");
  });

  test("It responds with 401 Unauthorized when no JWT is provided", async () => {
    const response = await makeRequest("get", "/api/clients");
    expect(response.statusCode).toBe(401);
  });

  test("It responds with 403 Unauthorized when an invalid JWT is provided", async () => {
    const response = await makeRequest("get", "/api/clients", "invalidToken");
    expect(response.statusCode).toBe(403);
  });
});
