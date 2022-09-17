import supertest from "supertest";
import { faker } from "@faker-js/faker";

import server from "../../src/index";
import client from "../../src/dbStrategy/postgres";
import { factory } from "../factory";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("POST /signUp", () => {
  it("returns 201 for valid params", async () => {
    const newUserData = await factory.createUserData();
      
    const result = await supertest(server).post("/signUp").send(newUserData);

    expect(result.status).toBe(201);
  });

  it("returns 409 for email in use", async () => {
    const newUserData = await factory.createUserData();

    await supertest(server).post("/signUp").send(newUserData);
    const result = await supertest(server).post("/signUp").send(newUserData);

      expect(result.status).toBe(409);
  });

  it("returns 422 for invalid body request", async () => {
    const invalidCreateUser = {
      bolinha: faker.internet.email(),
      junin: faker.color.rgb(),
    };

    const result = await supertest(server).post("/signUp").send(invalidCreateUser);

    expect(result.status).toBe(422);
  });

  it("returns 422 for unmacthed passwords", async () => {
    const newUserData = await factory.createUserData();
    newUserData.confirmPassword = "abcdef";

    const result = await supertest(server).post("/signUp").send(newUserData);

    expect(result.status).toBe(422);
  });
});


afterAll(async () => {
  await client.$executeRaw`TRUNCATE TABLE users`;
  await client.$disconnect();
});