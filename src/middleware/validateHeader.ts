import { Request, Response, NextFunction } from "express";

import headerSchema from "../schemas/headerSchema";
import { errorType } from "../utils/errorTypes";
import { verifyToken } from "../utils/tokenGenerator";

export default async function (req: Request, res: Response, next: NextFunction) {
    const { error } = headerSchema.validate(req.headers);

    if (error) {
        throw errorType.unprocessableEntityError(error);
    }

    const token = verifyToken(String(req.headers.authorization?.replace("Bearer ", "")));


    next();
}