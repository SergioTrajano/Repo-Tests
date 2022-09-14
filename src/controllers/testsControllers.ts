import { Request, Response } from "express";

import { ITest } from "../repositories/testsRepository";
import { testService } from "../services/testsServices";

async function create(req: Request, res: Response) {
    const newTestData: ITest = req.body;
    
    await testService.create(newTestData);

    res.sendStatus(201);
}

export const testController = {
    create,
}