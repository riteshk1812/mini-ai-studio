import express, { Express, Router, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { Server } from "http";

import { ENV } from "../config/env";
import { pool, initializeDb } from "../config/db";
import swaggerSpec from "../config/swagger";
import type { TMiddleware } from "../types/types";
import path from "path";

export function initServer(router: Router, middleware?: TMiddleware[]): { app: Express; server?: Server } {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (middleware?.length) {
    middleware.forEach((m) => app.use(m));
  }

  // --- Initialize DB ---
  if (ENV.NODE_ENV !== "test") {
    initializeDb();
  }
  // initializeDb();

  // --- Liveness ---
  app.get("/liveness", (_req: Request, res: Response) => {
    res.send("AI Studio Services!");
  });

  // --- DB Health ---
  app.get("/db-health", async (_req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT NOW() AS current_time");
      res.json({
        message: "DB Connected Successfully",
        time: result.rows[0].current_time,
        dbUrl: `${ENV.DB_HOST}/${ENV.DB_NAME}`,
      });
    } catch (err) {
      console.error("DB Health Error:", err);
      res.status(500).json({ error: "Database query failed!!" });
    }
  });

  // --- API Routes ---
  app.use(router);

  // --- Swagger Docs ---
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // --- File Uploads ---
  app.use('/uploads', express.static(path.join(__dirname, '../assets/uploads')));

  // --- Debug Info ---
  console.log("Loaded ENV:", {
    DB_HOST: ENV.DB_HOST,
    DB_NAME: ENV.DB_NAME,
    DB_USER: ENV.DB_USER,
  });

  // --- Start Server ---
  let server: Server | undefined;
  if (ENV.NODE_ENV !== "test") {
    server = app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
    });
  }

  return { app, server };
}
