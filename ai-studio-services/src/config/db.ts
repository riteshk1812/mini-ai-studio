import { Pool } from 'pg';
import { ENV } from './env';
import { pid } from 'process';

export const pool = new Pool({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});

export const initializeDb = async () => {
  try {
    // users table
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          phone VARCHAR(20) UNIQUE NOT NULL,
          password VARCHAR(200) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    );

    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS generations (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          prompt TEXT NOT NULL,
          style VARCHAR(100),
          image_url TEXT,
          status VARCHAR(20) DEFAULT 'success',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    );
  } catch (err) {
    console.error(`❌ Error initializing database: ${err}`);
  }
};

pool
  .connect()
  .then(() => {
    console.log('Connected to Postgres SQL DB');
  })
  .catch((err) => console.log(`Database connection error: ${err}`));
