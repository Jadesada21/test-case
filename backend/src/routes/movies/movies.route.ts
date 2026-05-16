import Router from 'express'

import {
    getAllMoviesController,
    createMoviesController,
    deleteMoviesController,
    patchMoviesController
} from '../../controller/movies.controller'

import { authorize } from '../../middleware/auth'
import { Role } from '../../types/users.type'

const router = Router()

router.route('/')
    .get(getAllMoviesController)
    .post(createMoviesController)

router.route('/:id')
    .patch(patchMoviesController)
    .delete(authorize(Role.manager), deleteMoviesController)


export default router