import client from "../dbStrategy/postgres";
import { User} from "@prisma/client";

export type IUser = Omit<User, "id">;

function findByEmail(email: string) {
    const dbUser = client.user.findFirst({ where: { email } });

    return dbUser;
}

async function create(newUserData: IUser) {
    await client.user.create({ data: newUserData });
}

export const userRepository = {
    create,
    findByEmail,
}