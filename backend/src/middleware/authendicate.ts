import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../util/app.error";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (!token) {
            throw new AppError("Unauthorize", 401)
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload

        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
        }
        next()
    } catch (err) {
        next(new AppError("Invalide token", 401))
    }
}