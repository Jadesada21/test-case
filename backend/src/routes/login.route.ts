import { Router } from 'express'
import { loginController } from '../controller/login.controller'

const router = Router()

router.route('/')
    .post(loginController)

export default router