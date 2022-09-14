import { Request, Response } from "express";

import { usersService } from "../services/usersServices";
import { IUser } from "../repositories/usersRepositories"


async function signUp(req: Request, res: Response) {
    const { email, password }: IUser = req.body;

    await usersService.signUp({email, password});

    res.sendStatus(201);
}

export const userController = {
    signUp,
}