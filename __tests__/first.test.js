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
// describe("POST /clients", () => {
//     test("It responds with the newly created student", async () => {
//       const newStudent = await request(app)
//         .post("/students")
//         .send({
//           name: "New Student"
//         });

//       // make sure we add it correctly
//       expect(newStudent.body).toHaveProperty("id");
//       expect(newStudent.body.name).toBe("New Student");
//       expect(newStudent.statusCode).toBe(200);

//       // make sure we have 3 students now
//       const response = await request(app).get("/students");
//       expect(response.body.length).toBe(3);
//     });
//   });
// });
