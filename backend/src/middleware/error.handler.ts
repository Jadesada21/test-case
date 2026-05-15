import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof Prisma.PrismaClientKnownRequestError
    ) {

        // unique constraint
        if (
            err.code === "P2002"
        ) {
            const field = Array.isArray(
                err.meta?.target
            )
                ? err.meta.target.join(",")
                : "Field"

            return res.status(409).json({ success: false, message: `${field} already exists` })
        }
    }

    return res.status(500).json({ success: false, message: "Internet server error" })
}