import { Router } from "express"

import createUser from './users/createUser.route'
import users from './users/users.route'
import login from './users/login.route'
import logout from './users/logout.route'
import movies from './movies/movies.route'

import { authenticate } from "../middleware/authendicate"

const router = Router()

router.use('/register', createUser)
router.use('/login', login)

router.use(authenticate)

router.use('/users', users)
router.use('/movies', movies)
router.use('/logout', logout)

export default router