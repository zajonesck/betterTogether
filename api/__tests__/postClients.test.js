const request = require("supertest");
const { app } = require("../src/index");
const { deleteClientForTest } = require("../src/queries");
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

function makeRequest(method, path, body = null) {
  const req = request(app)
    [method](path)
    .set("Authorization", `Bearer ${TESTJWT}`);
  if (body) {
    req.send(body);
  }
  return req;
}

describe("Client Operations", () => {
  let cleanUpPostTestClientIds = [];

  afterEach(async () => {
    for (let clientId of cleanUpPostTestClientIds) {
      try {
        await deleteClientForTest(clientId);
      } catch (error) {
        console.error(`Failed to delete client with ID ${clientId}:`, error);
      }
    }
    cleanUpPostTestClientIds = []; // Reset after cleaning up
  });

  describe("Create a new client", () => {
    test("It responds with the newly created client", async () => {
      const response = await makeRequest("get", "/api/clients");
      const numberOfClients = response.body.length;

      const newClient = await makeRequest("post", "/api/clients", {
        first_name: "New",
        last_name: "Client",
        birth_day: "10/10/2010",
      });

      const newResponse = await makeRequest("get", "/api/clients");
      expect(newResponse.body.length).toBe(numberOfClients + 1);
      expect(newClient.body).toHaveProperty("id");
      expect(newClient.body).toHaveProperty("first_name", "New");
      expect(newClient.body).toHaveProperty("last_name", "Client");
      expect(newClient.body).toHaveProperty(
        "birth_day",
        "2010-10-10T05:00:00.000Z"
      );
      expect(newClient.statusCode).toBe(201);

      if (newClient.body.id) {
        cleanUpPostTestClientIds.push(newClient.body.id);
      }
    });

    test("Throws 400 error when there is no client_name", async () => {
      const newClient = await makeRequest("post", "/api/clients", {
        first_name: "",
        last_name: "Client",
        birth_day: "10/10/2010",
      });
      expect(newClient.body).toStrictEqual({});
      expect(newClient.text).toEqual("Client name required.");
      expect(newClient.statusCode).toBe(400);
    });
    test("Throws 400 error when there is no birth_day", async () => {
      const newClientBody = {
        first_name: "New",
        last_name: "Client",
        birth_day: "",
      };
      const newClient = await makeRequest(
        "post",
        "/api/clients",
        newClientBody
      );
      expect(newClient.body).toStrictEqual({});
      expect(newClient.text).toEqual("Birthday required.");
      expect(newClient.statusCode).toBe(400);
    });
    test("Throws 400 error when birth_day is an invalid date", async () => {
      const newClientBody = {
        first_name: "New",
        last_name: "Client",
        birth_day: "abcd",
      };
      const newClient = await makeRequest(
        "post",
        "/api/clients",
        newClientBody
      );
      expect(newClient.body).toStrictEqual({});
      expect(newClient.text).toEqual("Valid birthday required.");
      expect(newClient.statusCode).toBe(400);
    });

    test("Throws 400 error when birth_day is more than 200 years ago", async () => {
      const newClientBody = {
        first_name: "New",
        last_name: "Client",
        birth_day: "10/10/1010",
      };
      const newClient = await makeRequest(
        "post",
        "/api/clients",
        newClientBody
      );
      expect(newClient.body).toStrictEqual({});
      expect(newClient.text).toEqual("Are you really that old?");
      expect(newClient.statusCode).toBe(400);
    });

    afterEach(async () => {
      for (let clientId of cleanUpPostTestClientIds) {
        try {
          await deleteClientForTest(clientId);
        } catch (error) {
          console.error(`Failed to delete client with ID ${clientId}:`, error);
        }
      }
      cleanUpPostTestClientIds = []; // Reset after cleaning
    });

    describe("Create a new client weight", () => {
      test("Throws 400 error when there is no weight", async () => {
        const newWeightBody = {
          weight: "",
        };
        const newClient = await makeRequest(
          "post",
          "/api/clients_weights/:153",
          newWeightBody
        );
        expect(newClient.body).toStrictEqual({});
        expect(newClient.text).toEqual("Client weight required.");
        expect(newClient.statusCode).toBe(400);
      });

      test("Throws 400 error when clients_weights is an invalid weight", async () => {
        const newWeightBody = {
          weight: "abcd",
        };
        const newClient = await makeRequest(
          "post",
          "/api/clients_weights/:clientId",
          newWeightBody
        );
        expect(newClient.body).toStrictEqual({});
        expect(newClient.text).toEqual("Valid weight required.");
        expect(newClient.statusCode).toBe(400);
      });
    });
  });
});
