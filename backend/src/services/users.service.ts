import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { CreateUsers, Role } from '../types/users.type'
import { AppError } from '../util/app.error'


export const getAllUsersService = async () => {
    const users = await prisma.users.findMany({
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

    if (!users.length) throw new AppError("No user found", 404)

    return users
}

export const createUsersService = async ({
    username,
    password,
    email,
}: CreateUsers
) => {

    const hashedPassword = await bcrypt.hash(password, 10)


    return await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
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

export const patchRoleService = async (id: number, role: Role) => {
    if (!Object.values(Role).includes(role)) {
        throw new AppError("Invalid role", 400)
    }

    const user = await prisma.users.findUnique({ where: { id } })
    if (!user) throw new AppError("User not found", 404)

    return await prisma.users.update({
        where: { id },
        data: {
            role,
            updated_at: new Date()  // ← force update
        },
        select: {
            id: true,
            username: true,
            role: true
        }
    })
}
