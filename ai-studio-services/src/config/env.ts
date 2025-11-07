import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '5000',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME || "ai_studio",
  JWT_SECRET: process.env.JWT_SECRET || '',
  NODE_ENV: process.env.ENVIRONMENT || 'development',
  BASE_URL: process.env.BASE_URL,
};
