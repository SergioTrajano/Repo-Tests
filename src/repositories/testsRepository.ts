import { Test } from "@prisma/client";
import client from "../dbStrategy/postgres";

export type ITest = Omit<Test, "id">;

async function create(newTestData: ITest) {
    await client.test.create({ data: newTestData });
}

async function find() {
    const dbTests = await client.test.findMany();

    return dbTests;
}

export const testsRepository = {
    create,
    find,
}