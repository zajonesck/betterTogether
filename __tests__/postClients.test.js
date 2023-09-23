const request = require("supertest");
const app = require("../app");
const { deleteClientForTest } = require("../routes/queries");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

let createdClientIds = [];

describe("POST /clients", () => {
  afterEach(async () => {
    for (let clientId of createdClientIds) {
      try {
        await deleteClientForTest(clientId);
      } catch (error) {
        console.error(`Failed to delete client with ID ${clientId}:`, error);
      }
    }
    createdClientIds = []; // Reset after cleaning up
  });

  test("It responds with the newly created client", async () => {
    const response = await request(app).get("/clients");
    const numberOfClients = response.body.length;

    const newClient = await request(app).post("/clients").send({
      first_name: "New",
      last_name: "Client",
      birth_day: "10/10/2010",
    });

    if (newClient.body.id) {
      createdClientIds.push(newClient.body.id);
    }

    const newResponse = await request(app).get("/clients");
    expect(newResponse.body.length).toBe(numberOfClients + 1);
    expect(newClient.body).toHaveProperty("id");
    expect(newClient.body).toHaveProperty("first_name", "New");
    expect(newClient.body).toHaveProperty("last_name", "Client");
    expect(newClient.body).toHaveProperty(
      "birth_day",
      "2010-10-10T05:00:00.000Z"
    );
    expect(newClient.statusCode).toBe(201);
  });
  test("Throws 400 error when there is no client_name", async () => {
    const newClient = await request(app).post("/clients").send({
      first_name: "",
      last_name: "Client",
      birth_day: "10/10/2010",
    });
    expect(newClient.body).toStrictEqual({});
    expect(newClient.text).toEqual("Client name required.");
    expect(newClient.statusCode).toBe(400);
  });
  test("Throws 400 error when there is no birth_day", async () => {
    const newClient = await request(app).post("/clients").send({
      first_name: "New",
      last_name: "Client",
      birth_day: "",
    });
    expect(newClient.body).toStrictEqual({});
    expect(newClient.text).toEqual("Birthday required.");
    expect(newClient.statusCode).toBe(400);
  });
  test("Throws 400 error when birth_day is an invalid date", async () => {
    const newClient = await request(app).post("/clients").send({
      first_name: "New",
      last_name: "Client",
      birth_day: "abcd",
    });
    expect(newClient.body).toStrictEqual({});
    expect(newClient.text).toEqual("Valid birthday required.");
    expect(newClient.statusCode).toBe(400);
  });
  test("Throws 400 error when birth_day is more than 200 years ago", async () => {
    const newClient = await request(app).post("/clients").send({
      first_name: "New",
      last_name: "Client",
      birth_day: "10/10/1010",
    });
    expect(newClient.body).toStrictEqual({});
    expect(newClient.text).toEqual("Are you really that old?");
    expect(newClient.statusCode).toBe(400);
  });
  afterEach(async () => {
    for (let clientId of createdClientIds) {
      try {
        await deleteClientForTest(clientId);
      } catch (error) {
        console.error(`Failed to delete client with ID ${clientId}:`, error);
      }
    }
    createdClientIds = []; // Reset after cleaning
  });
});

describe("POST /clients_weights/:clientId", () => {
  test("Throws 400 error when there is no weight", async () => {
    const newClient = await request(app).post("/clients_weights/:153").send({
      weight: "",
    });
    expect(newClient.body).toStrictEqual({});
    expect(newClient.text).toEqual("Client weight required.");
    expect(newClient.statusCode).toBe(400);
  });
  test("Throws 400 error when clients_weights is an invalid weight", async () => {
    const newClient = await request(app)
      .post("/clients_weights/:clientId")
      .send({
        weight: "abcd",
      });
    expect(newClient.body).toStrictEqual({});
    expect(newClient.text).toEqual("Valid weight required.");
    expect(newClient.statusCode).toBe(400);
  });
});
