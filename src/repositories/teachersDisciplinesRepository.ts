import client from "../dbStrategy/postgres";

async function findById(id: number) {
    const dbTeacherDiscipline = await client.teacherDiscipline.findUnique({ where: { id } });

    return dbTeacherDiscipline;
}

export const teacherDisciplineRepository = {
    findById,
}