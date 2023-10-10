const request = require("supertest");
const { app } = require("../src/index");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { getTestJWT } = require("../src/testJWTSecret");

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

describe("Workout Operations", () => {
  describe("GET workouts", () => {
    test("should get all workouts", async () => {
      const res = await makeRequest("get", "/api/workouts");
      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET workout", () => {
    test("It responds with the requested workout", async () => {
      const workoutId = 1;
      const response = await makeRequest("get", `/api/workout/${workoutId}`);
      expect(response.statusCode).toBe(200);
    });
  });

  test("It responds with a 404 for non-existing workout", async () => {
    const nonExistingWorkoutId = 999999;
    const response = await makeRequest(
      "get",
      `/api/workout/${nonExistingWorkoutId}`
    );
    expect(response.statusCode).toBe(404);
  });

  describe("Create a client workout", () => {
    test("should add a client's workout and return the new workout's ID", async () => {
      const newWorkout = {
        client_id: 153,
        workout_id: 1,
        notes: "This is a test note",
        date: "2023-08-10T00:00:00Z",
      };

      const res = await makeRequest(
        "post",
        "/api/clients/workouts",
        newWorkout
      );
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty(
        "message",
        "Client workout added successfully!"
      );
    });

    test("should fail when workout_id is missing", async () => {
      const incompleteWorkout = {
        client_id: 153,
        notes: "This is a test note",
        date: "2023-08-10T00:00:00Z",
      };

      const res = await makeRequest(
        "post",
        "/api/clients/workouts",
        incompleteWorkout
      );
      expect(res.text).toBe("workout_id is required.");
      expect(res.statusCode).toBe(400);
    });
  });
});
