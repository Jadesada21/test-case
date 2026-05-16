import { Router } from "express"

import users from './users/allusers.route'
import createUser from './users/users.route'
import updateRole from './users/users.route'
import login from './users/login.route'
import logout from './users/logout.route'
import movies from './movies/movies.route'

import { authenticate } from "../middleware/authendicate"

const router = Router()

router.use('/register', createUser)
router.use('/login', login)
router.use('/logout', logout)

router.use(authenticate)

router.use('/users', users)
router.use('/update', updateRole)

router.use('/movies', movies)

export default router