/**
 * Tests de integración para endpoints básicos.
 */

import { jest } from "@jest/globals";
import app from "../src/app.js";

let server;

beforeAll(() => {
  // Puerto 0 = puerto aleatorio
  server = app.listen(0);
});

afterAll(() => {
  server.close();
});

describe("Health Check", () => {
  test("GET /api/health debe retornar estado ok", async () => {
    const response = await fetch(`http://localhost:${server.address().port}/api/health`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("estado", "ok");
    expect(data).toHaveProperty("timestamp");
  });
});
