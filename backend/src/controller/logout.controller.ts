import { Request, Response, NextFunction } from "express";

export const logoutController = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    })

    return res.status(200).json({ status: "success", message: "Logout successfully" })
}