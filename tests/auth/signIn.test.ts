import supertest from "supertest";

import server from "../../src/index";
import client from "../../src/dbStrategy/postgres";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("/POST /signIn", () => {
    const validCreateUser = {
        email: "aluno1@driven.com",
        password: "a1234",
        confirmPassword: "a1234",
    };

    it("returns 200 for valid credentials", async () => {
        const validUserCredentials = {
            email: "aluno1@driven.com",
            password: "a1234",
        }

        await supertest(server).post("/signUp").send(validCreateUser);
        const result = await supertest(server).post("/signIn").send(validUserCredentials);

        expect(result.status).toBe(200);
        expect(result.body).not.toBe(null);
    });

    it("returns 422 for invalid params", async () => {
        const invalidProperties = {
            test: "aluno1@driven.com",
            test0: "a1234",
        }

        await supertest(server).post("/signUp").send(validCreateUser);
        const result = await supertest(server).post("/signIn").send(invalidProperties);

        expect(result.status).toBe(422);
    });

    it("returns 401 for invalid credentials", async () => {
        const invalidUserCredentials = {
            email: "aluno1@driven.com",
            password: "a12340",
        }

        await supertest(server).post("/signUp").send(validCreateUser);
        const result = await supertest(server).post("/signIn").send(invalidUserCredentials);

        expect(result.status).toBe(401);
    });
});

afterAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`
    client.$disconnect();
});