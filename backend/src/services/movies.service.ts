import { Request, Response, NextFunction } from "express";
import { prisma } from '../lib/prisma'
import { MovieInput, Rating } from "../types/movies.type";
import { AppError } from "../util/app.error";

export const getAllMoviesService = async () => {
    const movies = await prisma.movies.findMany({
        select: {
            id: true,
            title: true,
            year_released: true,
            rating: true,
            created_at: true,
            updated_at: true,
            users: {
                select: {
                    username: true,
                    role: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    if (!movies.length) throw new AppError("No movies found", 404)

    return movies.map(({ users, ...rest }) => ({
        ...rest, created_by: users
    }))
}

export const createMoviesService = async ({
    title, year_released, rating }: MovieInput, userId: number
) => {

    if (year_released < 1888 || year_released > new Date().getFullYear()) {
        throw new AppError("Invalid year", 400)
    }

    if (!Object.values(Rating).includes(rating)) {
        throw new AppError("Invalid rating", 400)
    }

    return await prisma.movies.create({
        data: {
            title,
            year_released,
            rating,
            created_by: userId
        },
        select: {
            id: true,
            title: true,
            year_released: true,
            rating: true,
            created_by: true,
            created_at: true,
            updated_at: true
        }
    })
}

export const patchMoviesService = async (id: number, data: Partial<MovieInput>) => {
    const movies = await prisma.movies.findUnique({ where: { id } })

    if (!movies) throw new AppError("Movie not found", 404)

    // validate year
    if (data.year_released) {
        if (data.year_released < 1888 || data.year_released > new Date().getFullYear())
            throw new AppError("Invalid year", 400)
    }

    // validate rating 
    if (data.rating) {
        if (!Object.values(Rating).includes(data.rating)) {
            throw new AppError("Invalid rating", 400)
        }
    }

    return await prisma.movies.update({
        where: { id },
        data: {
            ...data,
            updated_at: new Date()
        },
        select: {
            id: true,
            title: true,
            year_released: true,
            rating: true,
            created_by: true,
            created_at: true,
            updated_at: true
        }
    })
}


export const deleteMoviesService = async (id: number) => {
    const movies = await prisma.movies.findUnique({ where: { id } })

    if (!movies) throw new AppError("Movie not found", 404)

    return await prisma.movies.delete({ where: { id } })
}