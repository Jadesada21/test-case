import { prisma } from '../lib/prisma'

export const authService = async (id: number) => {
    await prisma.users.findUnique({
        select: {

        }
    })
}