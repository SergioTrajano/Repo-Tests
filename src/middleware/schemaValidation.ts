import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { errorType } from "../utils/errorTypes";

export default function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const body: object = req.body;
        const { error } = schema.validate(body, { abortEarly: false });

        if (error) {
            throw errorType.unprocessableEntityError(error);
        }

        next();
    }
}