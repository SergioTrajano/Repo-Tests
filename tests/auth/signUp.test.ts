import supertest from "supertest";

import server from "../../src/index";
import client from "../../src/dbStrategy/postgres";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("POST /signUp", () => {
  const validCreateUser = {
    email: "aluno1@driven.com",
    password: "a1234",
    confirmPassword: "a1234",
  };

  it("returns 201 for valid params", async () => {
      const result = await supertest(server).post("/signUp").send(validCreateUser);

      expect(result.status).toBe(201);
  });

  it("returns 409 for email in use", async () => {
      await supertest(server).post("/signUp").send(validCreateUser);
      const result = await supertest(server).post("/signUp").send(validCreateUser);

      expect(result.status).toBe(409);
  });

  it("returns 422 for invalid body request", async () => {
    const invalidCreateUser = {
      bolinha: "aluno1@driven.com",
      junin: "abc123",
      faltaIdeia: "abc123"
    };
      const result = await supertest(server).post("/signUp").send(invalidCreateUser);

      expect(result.status).toBe(422);
  });

  it("returns 422 for unmacthed passwords", async () => {
    const unmacthedPasswordsCreateUser = {
      email: "aluno1@driven.com",
      password: "abc123",
      confirmPassword: "abc1234"
    }
    const result = await supertest(server).post("/signUp").send(unmacthedPasswordsCreateUser);

    expect(result.status).toBe(422);
  });

  it("returns 422 for invalid type of params", async () => {
    const invalidTypeParamsCreateUser = {
      email: false,
      password: 123,
      confirmPassword: 123
    };
    const result = await supertest(server).post("/signUp").send(invalidTypeParamsCreateUser);

    expect(result.status).toBe(422);
  });
});


afterAll(async () => {
  await client.$disconnect();
});