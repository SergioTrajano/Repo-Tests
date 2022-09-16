import { Request, Response } from "express";

import { ITest } from "../repositories/testsRepository";
import { testService } from "../services/testsServices";

async function create(req: Request, res: Response) {
    const newTestData: ITest = req.body;
    
    await testService.create(newTestData);

    res.sendStatus(201);
}

async function getAllOrderBYTerms(req: Request, res: Response) {
    const tests = await testService.getAllOrderByTerms();

    res.status(200).send(tests);
}

async function getAllOrderByTeachers(req: Request, res: Response) {
    const tests = await testService.getAllOrderByTeachers();

    res.status(200).send(tests);
}

export const testController = {
    create,
    getAllOrderBYTerms,
    getAllOrderByTeachers,
}