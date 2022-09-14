import { User } from "@prisma/client";
import { userRepository, IUser } from "../repositories/usersRepositories";
import { errorType } from "../utils/errorTypes";
import { comparePassword, encryptPassword } from "../utils/passwordEncrypter";
import { generateToken } from "../utils/tokenGenerator";

async function signUp(newUserData: IUser) {
    const dbUser = await userRepository.findByEmail(newUserData.email);

    if (dbUser.id) {
        throw errorType.conflict();
    }

    await userRepository.create({
        ...newUserData,
        password: encryptPassword(newUserData.password)
    });
}

async function signIn(userData: IUser) {
    const dbUser: User = await userRepository.findByEmail(userData.email);

    if (!dbUser || !comparePassword(userData.password, dbUser.password)) {
        throw errorType.unathorized("credentials");
    } 

    return generateToken(String(dbUser.id));
}

async function findById(id: number) {
    return await userRepository.findById(id);
}

export const usersService = {
    signUp,
    signIn,
    findById,
}