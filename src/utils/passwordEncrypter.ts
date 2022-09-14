import { compareSync, hashSync } from "bcrypt";

const SALT: number = Number(process.env.BCRYPT_SALT);

export async function encryptPassword(password: string) {
    return hashSync(password, SALT);
}

export async function comparePassword(password: string, encryptPassword: string) {
    return compareSync(password, encryptPassword);
}