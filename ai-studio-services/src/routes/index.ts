import { Router } from "express";
import { authRouter } from "./auth";
import { generationRouter } from "./promptGeneration";
import { userRouter } from "./userRoutes";

export const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/generations', generationRouter)
apiRouter.use(userRouter)