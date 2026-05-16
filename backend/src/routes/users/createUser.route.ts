import { Router } from 'express'

import { createUsersController } from '../../controller/users.controller'

const router = Router()

router.route('/')
    .post(createUsersController)


export default router