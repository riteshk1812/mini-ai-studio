jest.mock("uuid", () => ({ v4: () => "mock-uuid" }));

import request from "supertest";
import {app, server} from "../index"; // Express app
import { pool } from "../config/db";



beforeAll(async () => {
  await pool.query("DELETE FROM users");
});

afterAll(async () => {
  try {
    // Gracefully close HTTP server (if created)
    if (server && typeof server.close === "function") {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
    }

    // Forcefully end all Postgres connections
    if (pool) {
      await pool.end().catch(() => null);
    }

    // Wait a bit to ensure handles are cleared
    await new Promise((resolve) => setTimeout(resolve, 200));

    jest.clearAllTimers();
  } catch (err) {
    console.error("Error in afterAll teardown:", err);
  }
}, 30000);


describe("Auth API", () => {

  test("Signup happy path", async () => {
    const res = await request(app)
  .post("/auth/signup")
  .send({
    name: "Ritesh",
    email: "ritesh@example.com",
    phone: "9999999999",
    password: "12345678",
    confirmPassword: "12345678"
  });
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/User created successfully/i);
  });

  test("Login with email success", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ritesh@example.com", password: "12345678" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("ritesh@example.com");
  });

  test("Login with invalid password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ritesh@example.com", password: "wrong" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe("Validation Errors", () => {
  test("Signup with missing fields", async () => {
    const res = await request(app).post("/auth/signup").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Please enter values/i);
  });

  test("Consistent error structure", async () => {
    const res = await request(app).post("/auth/login").send({});
    expect(res.body).toHaveProperty("error");
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
