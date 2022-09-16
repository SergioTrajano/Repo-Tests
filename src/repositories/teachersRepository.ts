import client from "../dbStrategy/postgres";

async function find() {
    const dbTeachers = await client.teacher.findMany();

    return dbTeachers;
}

export const teacherRepository = {
    find,
}