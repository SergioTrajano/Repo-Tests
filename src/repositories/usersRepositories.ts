import client from "../dbStrategy/postgres";
import { User} from "@prisma/client";

export type IUser = Omit<User, "id">;

const voidUser: User = {
    id: 0,
    email: "",
    password: "",
};

async function findByEmail(email: string) {
    const dbUser = await client.user.findFirst({ where: { email } });

    return dbUser || voidUser;
}

async function findById(id: number) {
    const dbUser = await client.user.findFirst({ where: { id } });

    return dbUser || voidUser;
}

async function create(newUserData: IUser) {
    await client.user.create({ data: newUserData });
}

export const userRepository = {
    create,
    findByEmail,
    findById,
}