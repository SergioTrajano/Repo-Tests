import client from "../dbStrategy/postgres";

async function find() {
    const dbTeacherDiscipline = await client.teacherDiscipline.findMany();

    return dbTeacherDiscipline;
}

async function findByTeacherAndDiscipline(teacherId: number, disciplineId: number) {
    const dbTeacherDiscipline = await client.teacherDiscipline.findFirst({
        where: {
            teacherId: teacherId,
            disciplineId: disciplineId,
        }
    });

    return dbTeacherDiscipline?.id || "";
}

export const teacherDisciplineRepository = {
    find,
    findByTeacherAndDiscipline,
}