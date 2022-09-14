import supertest from "supertest";

import server from "../../src/index";
import client from "../../src/dbStrategy/postgres";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
});

describe("/POST /tests", () => {
    const validCreateUser = {
        email: "aluno1@driven.com",
        password: "a1234",
        confirmPassword: "a1234",
    };
    const validUserCredentials = {
        email: "aluno1@driven.com",
        password: "a1234",
    };

    it("returns 201 for valid params", async () => {
        const validCreateTest = {
            name: "Teste 1",
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            categoryId: 2,
            teacherDisciplineId: 1
        }

        await supertest(server).post("/signUp").send(validCreateUser);
        const data = await supertest(server).post("/signIn").send(validUserCredentials);

        const result = await supertest(server).post("/tests").send(validCreateTest).set({ Authorization: `Bearer ${data.body.token}`});

        expect(result.status).toBe(201);
    });

    it("returns 404 for invalid categoryId", async () => {
        const invalidCreateTestParams = {
            name: "Teste 1",
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            categoryId: -1,
            teacherDisciplineId: 2
        }

        await supertest(server).post("/signUp").send(validCreateUser);
        const data = await supertest(server).post("/signIn").send(validUserCredentials);

        const result = await supertest(server).post("/tests").send(invalidCreateTestParams).set({ Authorization: `Bearer ${data.body.token}`});

        expect(result.status).toBe(404);
    });
});

afterAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests`;
    await client.$disconnect(); 
});