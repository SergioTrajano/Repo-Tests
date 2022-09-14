import jwt, { decode } from "jsonwebtoken";
import { errorType } from "./errorTypes";

const JWT_SECRETE: string = String(process.env.JWT_SECRET);

export function generateToken(id: string) {
    return jwt.sign(id, JWT_SECRETE);
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRETE) as { id: number};

    } catch {
        throw errorType.unathorized("token");
    }
}