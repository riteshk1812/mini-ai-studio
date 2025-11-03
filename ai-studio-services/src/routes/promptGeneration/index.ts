import Router from 'express'

import { isAuth } from '../../middleware/authMiddleware'
import { promptGenerationContoller } from '../../controllers/generationController'
import { upload } from '../../utils/fileUpload'
import { api } from '../../middleware/api'

export const generationRouter = Router()

generationRouter.post(
    '/',
    isAuth,
    upload.single('image'),
    api(async (req, res) => await promptGenerationContoller.post({req, res}))
);
generationRouter.get(
    '/',
    isAuth,
    api(async (req, res) => await promptGenerationContoller.get({ req, res }))
);