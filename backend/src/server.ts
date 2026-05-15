import dotenv from 'dotenv'
dotenv.config()
import app from "./app"
import { prisma } from './lib/prisma'

const startServer = async () => {
    try {
        const PORT = Number(process.env.PORT) || 3000

        await prisma.$connect()
        console.log("Prisma + PostgreSQL ready")

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        console.error("Connected Failed", err)
        process.exit(1)
    }
}

process.on("SIGNIN", async () => {
    await prisma.$disconnect()
    process.exit(0)
})

startServer()
