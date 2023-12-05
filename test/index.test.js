import request from "supertest";
import { app } from "../index.js";

describe("POST /users/login and GET /todos with token", () => {
  let token = "";

  it("responds with json", async () => {
    const response = await request(app)
      .post("/users/login")
      // utiliza un usuario que exista en la base de datos
      .send({ email: "test@test.com", password: "123123" });

    token = response.body.token;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("email");
  });

  // GET /todos with token
  it("responds with json", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.results).toBeInstanceOf(Array);
  });
});
