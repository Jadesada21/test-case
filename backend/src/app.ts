import express, { Application } from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/error.handler"
import Routes from './routes/index'

const app: Application = express()

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:4040', 'http://localhost:5173'],
    credentials: true
}))

app.use(express.json({ limit: "50mb" }))

app.use(Routes)

app.use(errorHandler)
export default app