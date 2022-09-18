import { ITest, testsRepository } from "../repositories/testsRepository";
import { categoryRepository } from "../repositories/categoriesRepository";
import { errorType } from "../utils/errorTypes";
import { teacherDisciplineRepository } from "../repositories/teachersDisciplinesRepository";
import { termsRepository } from "../repositories/termsRepository";
import { disciplineRespository } from "../repositories/disciplinesRepository";
import { teacherRepository } from "../repositories/teachersRepository";


async function create(newTestData: any) {
    const dbCategory = await categoryRepository.findById(newTestData.categoryId);
    const dbTeacherDisciplineId = await teacherDisciplineRepository.findByTeacherAndDiscipline(newTestData.teacherId, newTestData.disciplineId);

    if (!dbCategory) {
        throw errorType.notFound("CategoryId");
    }
    if (!dbTeacherDisciplineId) {
        throw errorType.notFound("Teacher and discipline relation");
    }

    await testsRepository.create({
        name: newTestData.name,
        pdfUrl: newTestData.pdfUrl,
        categoryId: newTestData.categoryId,
        teacherDisciplineId: dbTeacherDisciplineId,
    });
}

interface ICategory  {categoryName : string, tests: {
    name: string
    pdfUrl: string,
    teacher: string,
}[]}

interface ITeacher {
    name: string,
    categoriesData: {
        name: string,
        tests: {
            name: string,
            pdfUrl: string,
            discipline: string,
        }[]
    }[]
}[]

interface TCategory {
    name: string,
        tests: {
            name: string,
            pdfUrl: string,
            discipline: string,
        }[]
}

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

        for (let discipline of dbDisciplines) {
            if (discipline.termId === term.id) {
                const disciplineData: any = {
                    disciplineName: discipline.name,
                }

                const teachersDisciplines = dbTeacherDiscipline.filter(c => c.disciplineId === discipline.id);
                const disciplineTests = dbTests.filter(t =>  teachersDisciplines.some(tD => tD.id === t.teacherDisciplineId));
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

async function getAllOrderByTeachers() {
    const dbDisciplines = await disciplineRespository.find();
    const dbTeacherDiscipline = await teacherDisciplineRepository.find();
    const dbCategory = await categoryRepository.find();
    const dbTeachers = await teacherRepository.find();
    const dbTests = await testsRepository.find();

    let formatedTeachersData: ITeacher[] = [];

    for (let teacher of dbTeachers) {
        const teacherData: ITeacher = {
            name: teacher.name,
            categoriesData: []
        };

        const teacherDisciplines = dbTeacherDiscipline.filter(t => t.teacherId === teacher.id);

        const teacherTests = dbTests.filter(t => teacherDisciplines.some(c => t.teacherDisciplineId === c.id));
        
        const teacherCategories = dbCategory.filter(t => teacherTests.some(c => c.categoryId === t.id));

        for (let category of teacherCategories) {
            const categoryData: TCategory = {
                name: category.name,
                tests: [],
            }

            for (let test of teacherTests) {
                if (test.categoryId !== category.id) continue;
                const teacherDIscipline = teacherDisciplines.filter(t => t.id === test.teacherDisciplineId);
                const discipline = dbDisciplines.filter(t => t.id === teacherDIscipline[0].disciplineId);

                const testData = {
                    name: test.name,
                    pdfUrl: test.pdfUrl,
                    discipline: discipline[0].name,
                }

                categoryData.tests.push(testData);
            }

            teacherData.categoriesData.push(categoryData);
        }

        formatedTeachersData.push(teacherData);
    }

    return formatedTeachersData;
}

export const testService = {
    create,
    getAllOrderByTerms,
    getAllOrderByTeachers,
}