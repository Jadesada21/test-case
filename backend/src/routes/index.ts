import { Router } from "express"

import allUsers from './users/allusers.route'
import createUser from './users/users.route'
import login from './users/login.route'

const router = Router()

router.use('/register', createUser)
router.use('/login', login)
router.use('/users', allUsers)

export default router