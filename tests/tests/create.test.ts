import supertest from "supertest";

import server from "../../src/index";
import client from "../../src/dbStrategy/postgres";
import { factory } from "../factory"

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests`;
    await client.$executeRaw`TRUNCATE TABLE users`;
});

describe("/POST /tests", () => {
    it("returns 201 for valid params", async () => {
        const newUserData = await factory.createUserData();
        const newTestData = await factory.createTestData();

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).post("/tests").set({ Authorization: `Bearer ${tokenData.body.token}`}).send(newTestData);

        expect(result.status).toBe(201);
    });

    it("returns 404 for invalid categoryId", async () => {
        const newUserData = await factory.createUserData();
        const newTestData = await factory.createTestData();

        newTestData.categoryId = -1;

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).post("/tests").set({ Authorization: `Bearer ${tokenData.body.token}`}).send(newTestData);

        expect(result.status).toBe(404);
    });

    it("returns 404 for invalid teacherDisciplineId", async () => {
        const newUserData = await factory.createUserData();
        const newTestData = await factory.createTestData();

        newTestData.teacherDisciplineId = -1;

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).post("/tests").set({ Authorization: `Bearer ${tokenData.body.token}`}).send(newTestData);

        expect(result.status).toBe(404);
    });

    it("returns 422 for invalid newTest params", async () => {
        const newUserData = await factory.createUserData();
        const newTestData = {
            name: "assacsa",
            email: "sdcasnc@afdas.com"
        }

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).post("/tests").set({ Authorization: `Bearer ${tokenData.body.token}`}).send(newTestData);

        expect(result.status).toBe(422);
    });

    it("returns 422 for invalid header format", async () => {
        const newUserData = await factory.createUserData();
        const newTestData = await factory.createTestData();

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).post("/tests").set({ Authorization: `${tokenData.body.token}`}).send(newTestData);

        expect(result.status).toBe(422);
    });

    it("returns 401 for invalid token", async () => {
        const newUserData = await factory.createUserData();
        const newTestData = await factory.createTestData();

        await supertest(server).post("/signUp").send(newUserData);
        const tokenData = await supertest(server).post("/signIn").send({email: newUserData.email, password: newUserData.password});

        const result = await supertest(server).post("/tests").set({ Authorization: `Bearer aaaaa${tokenData.body.token}`}).send(newTestData);

        expect(result.status).toBe(401);
    });
});

afterAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests`;
    await client.$executeRaw`TRUNCATE TABLE users`;
    await client.$disconnect(); 
});