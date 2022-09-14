import { compareSync, hashSync } from "bcrypt";

const SALT: number = Number(process.env.BCRYPT_SALT);

export function encryptPassword(password: string) {
    return hashSync(password, SALT);
}

export function comparePassword(password: string, encryptPassword: string) {
    return compareSync(password, encryptPassword);
}