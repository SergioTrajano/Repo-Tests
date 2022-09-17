import supertest from "supertest";

import server from "../../src/index";
import client from "../../src/dbStrategy/postgres";
import { factory } from "../factory";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("/POST /signIn", () => {
    it("returns 200 for valid credentials", async () => {
        const newUserData = await factory.createUserData();

        await supertest(server).post("/signUp").send(newUserData);
        const result = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("returns 401 for invalid credentials", async () => {
        const newUserData = await factory.createUserData();
        const invalidUserCredentials = {
            email: "aluno1@driven.com",
            password: "a12340",
        }

        await supertest(server).post("/signUp").send(newUserData);
        const result = await supertest(server).post("/signIn").send(invalidUserCredentials);

        expect(result.status).toBe(401);
    });
});

afterAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`
    client.$disconnect();
});