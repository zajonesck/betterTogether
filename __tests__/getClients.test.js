const request = require("supertest");
const baseURL = "http://localhost:3000";
const app = require("../app");

describe("GET /clients", () => {
  test("It responds with an array of clients", async () => {
    const response = await request(baseURL).get("/clients");
    expect(response.body[0]).toHaveProperty("id");
<<<<<<< HEAD
    expect(response.body[0]).toHaveProperty("first_name");
=======
    expect(response.body[0]).toHaveProperty("client_name");
>>>>>>> 7e838819e2583a997058afafc4645ed780dc72b2
    expect(response.statusCode).toBe(200);
  });
});
