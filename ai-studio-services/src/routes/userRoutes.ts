import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {pool} from '../config/db';

export const userRouter = Router({ mergeParams: true });

userRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const encrptedPwd = await bcrypt.hash(password, 12);

    if (!name || !email || !encrptedPwd) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, encrptedPwd],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});
