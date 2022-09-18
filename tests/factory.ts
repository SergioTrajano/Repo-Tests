import { faker } from "@faker-js/faker";

async function createUserData() {
    const password = faker.lorem.word(5);
    
    const newUserData = {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
    };

    return newUserData;
}

async function createTestData() {
    const teacherId = faker.datatype.number({ min: 1, max: 2, precision: 1});
    const disciplineId = teacherId === 1 ? faker.datatype.number({ min: 1, max: 3, precision: 1}) : faker.datatype.number({ min: 4, max: 6, precision: 1});
    
    const newTestData = {
        name: faker.word.noun(),
        pdfUrl: faker.internet.url() + ".pdf", // fake convertion of the generated url to pdf 
        categoryId: faker.datatype.number({ min: 1, max: 3, precision: 1}),
        teacherId,
        disciplineId,
    };

    return newTestData;
}

export const factory = {
    createTestData,
    createUserData,
}