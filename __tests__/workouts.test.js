const request = require("supertest");
const app = require("../app");

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
    expect(response.body).toHaveProperty("workout_name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("difficulty");
    expect(response.body).toHaveProperty("exercises");
    expect(response.body.exercises[0]).toHaveProperty("id");
    expect(response.body.exercises[0]).toHaveProperty("name");
    expect(response.body.exercises[0]).toHaveProperty("description");
    expect(response.body.exercises[0]).toHaveProperty("primary_body_part_id");
    expect(response.body.exercises[0]).toHaveProperty("secondary_body_part_id");
  });
});

test("It responds with a 404 for non-existing workout", async () => {
  const nonExistingWorkoutId = 999999;
  const response = await request(app).get(`/workout/${nonExistingWorkoutId}`);

  expect(response.statusCode).toBe(404);
});
