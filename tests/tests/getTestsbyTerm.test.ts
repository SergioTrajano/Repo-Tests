import supertest from "supertest";
import { faker } from "@faker-js/faker";

import server from "../../src/index";
import { factory } from "../factory";
import client from "../../src/dbStrategy/postgres";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests`;
});

afterAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests`;
    await client.$disconnect();
});

describe("/GET /tests/terms", () => {
    it("returns 200 and a object array", async () => {
        const testsNumber = faker.datatype.number({min: 1, max: 10, precision: 1});

        for (let i = 0; i < testsNumber; i++) {
            const newTestData = await factory.createTestData();

            await supertest(server).post("/tests").send(newTestData);
        }

        const newUserData = await factory.createUserData();

        await supertest(server).post("/signUp").send(newUserData);

        const tokenData = await supertest(server).post("/signIn").send({ email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).get("/tests/terms").set({ Authorization: `Bearer ${tokenData.body.token}`});

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });

    it("returns 422 for invalid header", async () => {
        const newUserData = await factory.createUserData();

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});
        const result = await supertest(server).get("/tests/terms").set({ Authorization: `Bearer${tokenData.body.token}`});

        expect(result.status).toBe(422);
    });

    it("returns 401 for invalid token", async () => {
        const newUserData = await factory.createUserData();

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});
        const result = await supertest(server).get("/tests/terms").set({ Authorization: `Bearer ${faker.lorem.word(5)}`});

        expect(result.status).toBe(401);
    });
})