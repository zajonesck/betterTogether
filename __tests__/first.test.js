const request = require("supertest");
const baseURL = "http://localhost:3000";
const app = require("../app");

//GET
//test const getClients
describe("GET /clients", () => {
  test("It responds with an array of clients", async () => {
    const response = await request(baseURL).get("/clients");
    console.log("response: ", response);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("client_name");
    expect(response.statusCode).toBe(200);
  });
});

// //POST
// //test const addClient
describe("POST /clients", () => {
  test("It responds with the newly created client", async () => {
    const newClient = await request(baseURL).post("/clients").send({
      client: "New client",
      weight: 10,
    });
    //todo: fix test
    expect(newClient.body).toStrictEqual([]);
    expect(newClient.statusCode).toBe(200);
  });
});
