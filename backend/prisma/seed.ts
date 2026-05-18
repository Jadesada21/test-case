import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10)

    await prisma.users.createMany({
        data: [
            { username: "manager1", email: "manager1@gmail.com", password: "hashedPassword", role: "manager" },
            { username: "teamlead1", email: "teamlead1@gmail.com", password: "hashedPassword", role: "teamleader" },
            { username: "floorstaff1", email: "floorstaff1@gmail.com", password: "hashedPassword", role: "floorstaff" }
        ]
    })
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())