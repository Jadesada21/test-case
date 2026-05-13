import express, { Application } from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app: Application = express()

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173']
}))

app.use(express.json({ limit: "50mb" }))

export default app