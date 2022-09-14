import supertest from "supertest";

import server from "../src/index";
import client from "../src/dbStrategy/postgres";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("/POST /signIn", () => {
    it("returns 200 for valid credentials", async () => {
        const createUser = {
            email: "aluno1@driven.com",
            password: "a1234",
            confirmPassword: "a1234",
        };

        const user = {
            email: "aluno1@driven.com",
            password: "a1234",
        }

        await supertest(server).post("/signUp").send(createUser);
        const result = await supertest(server).post("/signIn").send(user);

        expect(result.status).toBe(200);
    });

    it("returns 422 for invalid params", async () => {
        const user = {
            test: "aluno1@driven.com",
            test0: "a1234",
        }

        const result = await supertest(server).post("/signIn").send(user);

        expect(result.status).toBe(422);
    });

    it("returns 401 for invalid credentials", async () => {
        const createUser = {
            email: "aluno1@driven.com",
            password: "a1234",
            confirmPassword: "a1234",
        };

        const user = {
            email: "aluno1@driven.com",
            password: "a12340",
        }

        await supertest(server).post("/signUp").send(createUser);
        const result = await supertest(server).post("/signIn").send(user);

        expect(result.status).toBe(401);
    });
});

afterAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`
    client.$disconnect();
});