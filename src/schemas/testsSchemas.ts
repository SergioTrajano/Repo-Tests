import joi from "joi";

import { ITest } from "../repositories/testsRepository";

const createTestSchema = joi.object<ITest>({
    name: joi.string().trim().required(),
    pdfUrl: joi.string().uri().pattern(/\.pdf$/).trim().required(),
    categoryId: joi.number().integer().strict().required(),
    teacherDisciplineId: joi.number().integer().strict().required(),
});

export { createTestSchema };