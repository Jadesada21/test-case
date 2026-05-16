import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/app.error";
import { loginService } from "../services/login.service";


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            throw new AppError("Missing field", 400)
        }

        const { accessToken, user } = await loginService({ username, password })

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })

        return res.status(200).json({ user })
    } catch (err) {
        return next(err)
    }
}