import joi, { ObjectSchema } from "joi";

const createUserSchema: ObjectSchema = joi.object({
    email: joi.string().email({tlds: { allow: false}}).required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().trim().required().equal(joi.ref("password")),
});

const loginUserSchema: ObjectSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().trim().required(),
});

export { createUserSchema, loginUserSchema };