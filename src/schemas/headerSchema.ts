import joi from "joi";

const headerSchema = joi.object({
    authorization: joi.string().pattern(/^Bearer /).required(),
}).options({ allowUnknown: true });

export default headerSchema;