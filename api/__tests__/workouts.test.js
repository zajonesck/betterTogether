require("dotenv").config({ path: "../env" });

const request = require("supertest");
const { app } = require("../src/index");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const TESTJWT = process.env.TESTJWT;

describe("GET workouts", () => {
  test("should get all workouts", async () => {
    const res = await request(app)
      .get("/api/workouts")
      .set("Authorization", `Bearer ${TESTJWT}`);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET workout", () => {
  test("It responds with the requested workout", async () => {
    const workoutId = 1;
    const response = await request(app)
      .get(`/api/workout/${workoutId}`)
      .set("Authorization", `Bearer ${TESTJWT}`);
    expect(response.statusCode).toBe(200);
  });
});

test("It responds with a 404 for non-existing workout", async () => {
  const nonExistingWorkoutId = 999999;
  const response = await request(app)
    .get(`/api/workout/${nonExistingWorkoutId}`)
    .set("Authorization", `Bearer ${TESTJWT}`);

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

    const res = await request(app)
      .post("/api/clients/workouts")
      .set("Authorization", `Bearer ${TESTJWT}`)
      .send(newWorkout)
      .expect(201);

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

    const res = await request(app)
      .post("/api/clients/workouts")
      .set("Authorization", `Bearer ${TESTJWT}`)
      .send(incompleteWorkout);

    expect(res.text).toBe("workout_id is required.");
    expect(res.statusCode).toBe(400);
  });
});
