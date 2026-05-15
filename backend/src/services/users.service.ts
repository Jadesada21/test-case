import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { CreateUsers } from '../types/users.type'

export const getAllUsersService = async () => {
    return await prisma.users.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            created_at: true,
            updated_at: true,
        },
        orderBy: {
            id: "desc"
        }
    })
}

export const createUsersService = async ({
    username,
    password,
    email
}: CreateUsers
) => {

    const hashedPassword = await bcrypt.hash(password, 10)


    return await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword
        },

        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            created_at: true
        }
    })
}