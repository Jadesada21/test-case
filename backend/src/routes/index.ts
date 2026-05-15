import { Router } from "express"

import allUsers from './allusers.route'
import createUser from './users.route'
import login from './login.route'

const router = Router()

router.use('/register', createUser)
router.use('/login', login)
router.use('/users', allUsers)

export default router