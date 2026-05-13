import { Request, Response, NextFunction } from "express";
import { Role } from "../types/users.type";
import { AppError } from "../util/app.error";

export const authorize = (roles: Role | Role[]) => {
    const allowedRoles = Array.isArray(roles)
        ? roles
        : [roles]

    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden", 403))
        }
    }
}