import client from "../dbStrategy/postgres";


async function find() {
    const dbDisciplines = await client.discipline.findMany();

    return dbDisciplines;
}

export const disciplineRespository = {
    find,
}