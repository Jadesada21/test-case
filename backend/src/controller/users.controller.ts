import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/app.error";
import {
    getAllUsersService,
    createUsersService,
} from "../services/users.service";

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await getAllUsersService()

        res.status(200).json({ data })
    } catch (err) {
        return next(err)
    }
}

export const createUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, email, } = req.body

        if (!username || !password || !email) {
            throw new AppError("Missing required field", 400)
        }

        const data = await createUsersService(req.body)
        return res.status(201).json({ data })
    } catch (err) {
        return next(err)
    }
}

// export const patchRoleController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params
//         const { role } = req.body



//         const user = await patchRoleService()
//     } catch (err) {
//         return next(err)
//     }
// }