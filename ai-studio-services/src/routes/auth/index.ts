import { Router } from 'express';
import { loginController, registerController } from '../../controllers/authController';
import { isAuth } from '../../middleware/authMiddleware';
import { api } from '../../middleware/api';

export const authRouter = Router();

/**
 * @openapi
 * /api/login:
 *  post:
 *      tags:
 *       - Auth
 *      summary: Login User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *      response:
 *          200:
 *            description: Successfully logged in.
 */

authRouter.post(
  '/signup',
  api(async (req, res) => await registerController.post({ req, res }))
)
authRouter.post(
  '/login',
  api(async (req, res) => await loginController.post({ req, res }))
)

authRouter.get('/users', isAuth, (req, res) => {
  res.json({ message: 'User Loggedin Successfully', user: (req as any).user})
})