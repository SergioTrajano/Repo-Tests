import supertest from "supertest";

import server from "../src/index";
import client from "../src/dbStrategy/postgres";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("POST /signUp", () => {
    it("returns 201 for valid params", async () => {
        const body = {
          email: "aluno1@driven.com",
          password: "abc123",
          confirmPassword: "abc123"
        };
  
        const result = await supertest(server).post("/signUp").send(body);
        const status = result.status;

        expect(status).toBe(201);
    });

    it("returns 409 for email in use", async () => {
        const body = {
          email: "aluno1@driven.com",
          password: "abc123",
          confirmPassword: "abc123"
        };
        
        await supertest(server).post("/signUp").send(body);
        const result = await supertest(server).post("/signUp").send(body);
        const status = result.status;

        expect(status).toBe(409);
    });

    it("returns 422 for invalid body request", async () => {
        const body = {
          bolinha: "aluno1@driven.com",
          junin: "abc123",
          faltaIdeia: "abc123"
        };
        
        const result = await supertest(server).post("/signUp").send(body);
        const status = result.status;

        expect(status).toBe(422);
    });

    it("returns 422 for unmacthed passwords", async () => {
        const body = {
          email: "aluno1@driven.com",
          password: "abc123",
          confirmPassword: "abc1234"
        };
        
        const result = await supertest(server).post("/signUp").send(body);
        const status = result.status;

        expect(status).toBe(422);
    });

    it("returns 422 for invalid type of params", async () => {
        const body = {
          email: false,
          password: 123,
          confirmPassword: 123
        };
        
        const result = await supertest(server).post("/signUp").send(body);
        const status = result.status;

        expect(status).toBe(422);
    });
});


afterAll(() => {
    client.$disconnect();
});