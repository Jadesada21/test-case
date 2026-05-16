import { Router } from "express"

import allUsers from './users/allusers.route'
import createUser from './users/users.route'
import login from './users/login.route'
import logout from './users/logout.route'

import { authenticate } from "../middleware/authendicate"

const router = Router()

router.use(authenticate)

router.use('/register', createUser)
router.use('/login', login)
router.use('/users', allUsers)

router.use('/logout', logout)

export default router