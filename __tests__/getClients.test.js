const request = require("supertest");
const baseURL = "http://localhost:3000";
const app = require("../app");

describe("GET /clients", () => {
  test("It responds with an array of clients", async () => {
    const response = await request(baseURL).get("/clients");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("first_name");
    expect(response.statusCode).toBe(200);
  });
});
