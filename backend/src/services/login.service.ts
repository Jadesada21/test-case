import { prisma } from '../lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from '../util/app.error'

import {
    LoginInput
} from '../types/login.type'


export const loginService = async ({
    username,
    password
}: LoginInput) => {
    const user = await prisma.users.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        throw new AppError("Invalid username or password", 401)
    }

    const Matched = await bcrypt.compare(password, user.password)

    if (!Matched) {
        throw new AppError("Invalid password", 401)
    }

    const accessToken = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },

        process.env
            .JWT_SECRET!,

        {
            expiresIn:
                "1h"
        }
    )
    return {

        accessToken,

        user: {
            id: user.id,
            username:
                user.username,
            role:
                user.role
        }
    }
}