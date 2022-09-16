import { Request, Response } from "express";

import { usersService } from "../services/usersServices";
import { IUser } from "../repositories/usersRepositories"


async function signUp(req: Request, res: Response) {
    const { email, password }: IUser = req.body;

    const createdUser = await usersService.signUp({email, password});

    res.status(201).send(createdUser);
}

async function signIn(req: Request, res: Response) {
    const userData: IUser = req.body;

    const token: string = await usersService.signIn(userData);

    res.status(200).send({ token });
}

export const userController = {
    signUp,
    signIn,
}