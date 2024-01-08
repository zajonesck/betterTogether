const request = require("supertest");
const { app } = require("../src/index");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { getTestJWT } = require("../src/testJWTSecret");
const db = require("../src/database");

let TESTJWT;

beforeAll(async () => {
  try {
    TESTJWT = await getTestJWT();
  } catch (err) {
    console.error("Failed to get secret:", err);
    throw err;
  }
});

function makeRequest(method, path, body) {
  const req = request(app)
    [method](path)
    .set("Authorization", `Bearer ${TESTJWT}`);
  if (body) req.send(body);
  return req;
}

describe("Exercise Operations", () => {
  describe("GET exercises", () => {
    test("should get all exercises", async () => {
      const res = await makeRequest("get", "/api/exercises");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET specific exercise", () => {
    test("It responds with the requested exercise", async () => {
      const exerciseId = 1;
      const res = await makeRequest("get", `/api/exercises/${exerciseId}`);
      expect(res.statusCode).toBe(200);
    });

    test("It responds with a 404 for non-existing exercise", async () => {
      const nonExistingExerciseId = 999999;
      const res = await makeRequest(
        "get",
        `/api/exercises/${nonExistingExerciseId}`
      );
      expect(res.statusCode).toBe(404);
    });
  });
});

afterAll(async () => {
  await db.closePool();
});
