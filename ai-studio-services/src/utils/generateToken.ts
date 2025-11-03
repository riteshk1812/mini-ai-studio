import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET as string, {
    expiresIn: '6h',
  });
};
