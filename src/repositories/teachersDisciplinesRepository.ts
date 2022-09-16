import client from "../dbStrategy/postgres";

async function findById(id: number) {
    const dbTeacherDiscipline = await client.teacherDiscipline.findUnique({ where: { id } });

    return dbTeacherDiscipline;
}

async function find() {
    const dbTeacherDiscipline = await client.teacherDiscipline.findMany();

    return dbTeacherDiscipline;
}

export const teacherDisciplineRepository = {
    find,
    findById,
}