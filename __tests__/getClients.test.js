const request = require("supertest");
const { app } = require("../routes/index");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("GET /clients", () => {
  test("It responds with an array of clients", async () => {
    const response = await request(app).get("/clients");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("first_name");
    expect(response.statusCode).toBe(200);
  });
});
