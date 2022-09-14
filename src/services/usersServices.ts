import { userRepository, IUser } from "../repositories/usersRepositories";
import { errorType } from "../utils/errorTypes"

async function signUp(newUserData: IUser) {
    const dbUser = await userRepository.findByEmail(newUserData.email);

    if (dbUser) {
        throw errorType.conflict();
    }

    await userRepository.create(newUserData);
}

export const usersService = {
    signUp,
}