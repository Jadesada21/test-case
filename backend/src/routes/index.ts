import { Router } from "express"

import allUsers from './allusers.route'
import createUser from './users.route'

const router = Router()

router.use('/register', createUser)
router.use('/users', allUsers)

export default router