import { apiRouter } from "./routes";
import { Router } from "express";
import { initServer } from "./utils/initServer";

const router = Router();

router.use(apiRouter);

export const { app, server } = initServer(router);