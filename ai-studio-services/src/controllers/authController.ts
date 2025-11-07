import { Request, Response } from 'express';

import { registerUser, loginUser } from '../services/authService';
import { IApiController, IMiddlewareParams } from '../types/types';

export const registerController: Pick<IApiController, 'post'> = {
  post: async function ({ req, res }: IMiddlewareParams): Promise<void> {
    try {
      const { name, email, phone, password, confirmPassword } = req.body;

      if (!name || !email || !phone || !password || !confirmPassword) {
        res
          .status(400)
          .json({ error: "Please enter values in all the fields!!" });
        return;
      }

      if (password !== confirmPassword) {
        res.status(400).json({ error: "Passwords do not match!!" });
        return;
      }

      const result = await registerUser(name, email, password, phone);
      res.status(201).json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

export const loginController: Pick<IApiController, 'post'> = {
  post: async function ({ req, res }: IMiddlewareParams): Promise<void> {
    try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      res.status(400).json({ error: 'Email/Phone and password are required' });
      return;
    }

    const result = await loginUser(email || phone, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
  }
}