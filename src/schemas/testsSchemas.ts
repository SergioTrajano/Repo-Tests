import joi from "joi";

const createTestSchema = joi.object({
    name: joi.string().trim().required(),
    pdfUrl: joi.string().uri().pattern(/\.pdf$/).trim().required(),
    categoryId: joi.number().integer().strict().required(),
    teacherId: joi.number().integer().strict().required(),
    disciplineId: joi.number().integer().strict().required(),
});

export { createTestSchema };