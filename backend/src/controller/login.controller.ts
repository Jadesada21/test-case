import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/app.error";
import { loginService } from "../services/login.service";


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            throw new AppError("Missing field", 400)
        }

        const data = await loginService({ username, password })
        return res.status(200).json({ data })
    } catch (err) {
        return next(err)
    }
}