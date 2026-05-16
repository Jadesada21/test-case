import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/app.error";

import {
    createMoviesService,
    deleteMoviesService,
    getAllMoviesService,
    patchMoviesService
}
    from "../services/movies.service";


export const getAllMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getAllMoviesService()
        res.status(200).json({ data })
    } catch (err) {
        return next(err)
    }
}

export const createMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, year_released, rating } = req.body

        if (!title || !year_released || !rating) {
            throw new AppError("Missing required field", 400)
        }

        const data = await createMoviesService(req.body, req.user!.id)
        return res.status(201).json({ data })
    } catch (err) {
        return next(err)
    }
}

export const patchMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await patchMoviesService(Number(id), req.body)
        return res.status(200).json({ data })
    } catch (err) {
        return next(err)
    }
}

export const deleteMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        await deleteMoviesService(Number(id))

        return res.status(200).json({ messsage: "Movie deleted successfully" })
    } catch (err) {
        return next(err)
    }
}
