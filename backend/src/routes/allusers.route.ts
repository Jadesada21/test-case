import { Router } from 'express'


import {
    getAllUsersController,
} from '../controller/users.controller'

const router = Router()

router.route('/')
    .get(getAllUsersController)

export default router