require("dotenv").config({ path: "../env" });

const request = require("supertest");
const { app } = require("../src/index");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const TESTJWT = process.env.TESTJWT;

describe("GET /clients", () => {
  test("It responds with an array of clients", async () => {
    const response = await request(app)
      .get("/api/clients")
      .set("Authorization", `Bearer ${TESTJWT}`);
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("first_name");
  });
});
