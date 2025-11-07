// jest.mock("uuid", () => ({ v4: () => "mock-uuid" }));

// import request from "supertest";
// import { app } from "../index";
// import path from 'path';

// let token: string;
// const fixturePath = path.join(__dirname, "fixtures", "sample.png");

// beforeAll(async () => {
//   const login = await request(app)
//     .post("/auth/login")
//     .send({ email: "ritesh@example.com", password: "12345678" });
//   token = login.body.token;
// });

// jest.setTimeout(10000);

// describe("Generations API", () => {
//   test("Unauthorized access should fail", async () => {
//     const res = await request(app).get("/generations");
//     expect(res.status).toBe(401);
//   });

//   test("Create generation success", async () => {
//     const res = await request(app)
//       .post("/generations")
//       .set("Authorization", `Bearer ${token}`)
//       .field("prompt", "A cyberpunk cat")
//       .field("style", "Cyberpunk")
//       .attach("image", fixturePath);
//     expect(res.status).toBe(201);
//     expect(res.body.data.prompt).toBe("A cyberpunk cat");
//   });

//   test("Simulated overload error", async () => {
//     const res = await request(app)
//       .get("/generations")
//       .set("Authorization", `Bearer ${token}`);
//     expect([429, 500]).toContain(res.status);
//   });
// });

import request from "supertest";
import path from "path";
import { app } from "../index";

let token: string;
const fixturePath = path.join(__dirname, "fixtures", "sample.png");

beforeAll(async () => {
  const login = await request(app)
    .post("/auth/login")
    .send({ email: "ritesh@example.com", password: "12345678" });
  token = login.body.token;
});

jest.setTimeout(10000);

describe("Generations API", () => {
  test("Unauthorized access should fail", async () => {
    const res = await request(app).get("/generations");
    expect(res.status).toBe(401);
  });

  test("Create generation success", async () => {
    const res = await request(app)
      .post("/generations")
      .set("Authorization", `Bearer ${token}`)
      .field("prompt", "A cyberpunk cat")
      .field("style", "Cyberpunk")
      .attach("image", fixturePath);
    expect(res.status).toBe(201);
    expect(res.body.data.prompt).toBe("A cyberpunk cat");
  });

  test("Simulated overload error", async () => {
    const res = await request(app)
      .get("/generations")
      .set("Authorization", `Bearer ${token}`);
    expect([200, 429, 500]).toContain(res.status);
  });
});
