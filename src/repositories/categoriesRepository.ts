import { Categorie } from "@prisma/client";
import client from "../dbStrategy/postgres";

async function findById(id: number) {
    const dbCategory = await client.categorie.findUnique({ where: { id } });

    return dbCategory;
}

async function find() {
    const dbCategory = await client.categorie.findMany();

    return dbCategory;
}

export const categoryRepository = {
    find,
    findById,
}