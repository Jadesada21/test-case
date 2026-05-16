import { Router } from 'express'

import {
    createUsersController,
    patchRoleController
} from '../../controller/users.controller'
import { authorize } from '../../middleware/auth'
import { Role } from '../../types/users.type'

const router = Router()

router.route('/')
    .post(createUsersController)

router.route('/:id')
    .patch(authorize(Role.manager), patchRoleController)

export default router