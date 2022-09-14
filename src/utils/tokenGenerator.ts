import jwt from "jsonwebtoken";

const JWT_SECRETE: string = String(process.env.JWT_SECRET);

export function generateToken(id: string) {
    return jwt.sign(id, JWT_SECRETE);
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRETE);
}