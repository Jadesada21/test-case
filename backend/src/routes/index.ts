import { Router } from "express"

import allUsers from './users/allusers.route'
import createUser from './users/users.route'
import updateRole from './users/users.route'
import login from './users/login.route'
import logout from './users/logout.route'

import { authenticate } from "../middleware/authendicate"

const router = Router()

router.use('/register', createUser)
router.use('/login', login)
router.use('/logout', logout)

router.use(authenticate)

router.use('/users', allUsers)
router.use('/update', updateRole)


export default router