const request = require("supertest");
const app = require("../app");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("GET /workouts", () => {
  test("should get all workouts", async () => {
    const res = await request(app).get("/workouts").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /workout/:workoutId", () => {
  test("It responds with the requested workout", async () => {
    const workoutId = 1;
    const response = await request(app).get(`/workout/${workoutId}`);
    expect(response.statusCode).toBe(200);
  });
});

test("It responds with a 404 for non-existing workout", async () => {
  const nonExistingWorkoutId = 999999;
  const response = await request(app).get(`/workout/${nonExistingWorkoutId}`);
  expect(response.statusCode).toBe(404);
});

describe("POST /clients/workouts", () => {
  test("should add a client's workout and return the new workout's ID", async () => {
    const newWorkout = {
      client_id: 153,
      workout_id: 1,
      notes: "This is a test note",
      date: "2023-08-10T00:00:00Z",
    };

    const res = await request(app)
      .post("/clients/workouts")
      .send(newWorkout)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty(
      "message",
      "Client workout added successfully!"
    );
  });

  test("should fail when required fields are missing", async () => {
    const incompleteWorkout = {
      client_id: 153,
      notes: "This is a test note",
      date: "2023-08-10T00:00:00Z",
    };

    const res = await request(app)
      .post("/clients/workouts")
      .send(incompleteWorkout)
      .expect(400);
  });
});
