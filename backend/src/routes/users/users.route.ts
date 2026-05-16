import { Router } from 'express'


import {
    getAllUsersController,
    patchRoleController,
} from '../../controller/users.controller'

import { authorize } from '../../middleware/auth'
import { Role } from '../../types/users.type'

const router = Router()

router.route('/')
    .get(getAllUsersController)

router.route('/:id')
    .patch(authorize(Role.manager), patchRoleController)

export default router