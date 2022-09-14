import { ITest, testsRepository } from "../repositories/testsRepository";
import { categoryRepository } from "../repositories/categoriesRepository";
import { errorType } from "../utils/errorTypes";
import { teacherDisciplineRepository } from "../repositories/teachersDisciplinesRepository";


async function create(newTestData: ITest) {
    const dbCategory = await categoryRepository.findById(newTestData.categoryId);

    if (!dbCategory) {
        throw errorType.notFound("CategoryId");
    }

    const dbTeacherDiscipline = await teacherDisciplineRepository.findById(newTestData.teacherDisciplineId);

    if (!dbTeacherDiscipline) {
        throw errorType.notFound("teacherDisciplineId");
    }

    await testsRepository.create(newTestData);
}

export const testService = {
    create,
}