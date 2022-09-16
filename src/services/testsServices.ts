import { ITest, testsRepository } from "../repositories/testsRepository";
import { categoryRepository } from "../repositories/categoriesRepository";
import { errorType } from "../utils/errorTypes";
import { teacherDisciplineRepository } from "../repositories/teachersDisciplinesRepository";
import { termsRepository } from "../repositories/termsRepository";
import { disciplineRespository } from "../repositories/disciplinesRepository";
import { teacherRepository } from "../repositories/teachersRepository";


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


interface ICategory  {categoryName : string, tests: {
    name: string
    pdfUrl: string,
    teacher: string,
}[]}

async function getAllOrderByTerms() {
    const dbTerms = await termsRepository.find();
    const dbDisciplines = await disciplineRespository.find();
    const dbTeacherDiscipline = await teacherDisciplineRepository.find();
    const dbCategory = await categoryRepository.find();
    const dbTeachers = await teacherRepository.find();
    const dbTests = await testsRepository.find();

    const testsFormtatedByTerm = [];

    for (let term of dbTerms) {
        const termData: any = {
            period: term.number,
            disciplinesData: [],
        };
        const Discipline = [dbDisciplines[0]]
        for (let discipline of dbDisciplines) {
            if (discipline.termId === term.id) {
                const disciplineData: any = {
                    disciplineName: discipline.name,
                }

                let teachersDisciplines = dbTeacherDiscipline.filter(c => c.disciplineId === discipline.id);
                let disciplineTests = dbTests.filter(t =>  teachersDisciplines.some(tD => tD.id === t.teacherDisciplineId));
                const termCategories = dbCategory.filter(c => disciplineTests.some(t => t.categoryId === c.id));
                disciplineData.categories = termCategories.map(c => {
                    const categoryData: ICategory= {
                        categoryName: c.name,
                        tests: [],
                    };
                    const testsTerm = disciplineTests.filter(t => termCategories.some(c => c.id === t.categoryId));
                    for (let test of testsTerm) {
                        const testData = {
                            name: test.name,
                            pdfUrl: test.pdfUrl,
                            teacher: "",
                        };
                        const teacherId = teachersDisciplines.filter(t => t.id === test.teacherDisciplineId);
                        const teacherName = dbTeachers.filter(teacher => teacher.id === teacherId[0].teacherId);
                        testData.teacher = teacherName[0].name;
                        categoryData.tests.push(testData);
                    }
                    
                    return categoryData;
                });

                termData.disciplinesData.push(disciplineData);
            } else continue;
        }

        testsFormtatedByTerm.push(termData);

    }

    return testsFormtatedByTerm;
}

export const testService = {
    create,
    getAllOrderByTerms,
}