import client from "../dbStrategy/postgres";

async function find() {
    const dbTerms = await client.term.findMany({
        orderBy: {
            number: "desc",
        },
    });

    return dbTerms;
}

export const termsRepository = {
    find,
}