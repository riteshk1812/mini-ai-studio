import bcrypt from 'bcrypt';
import { pool } from '../config/db';
import { generateToken } from '../utils/generateToken';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | number | null;
  password: string;
  created_at: Date;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string | number | null,
) => {
  const encryptedPwd = await bcrypt.hash(password, 12);

  const existingUser = await pool.query('SELECT * FROM users where email = $1 OR phone = $2', [
    email,
    phone,
  ]);

  if (existingUser.rows.length > 0) throw new Error('User already exists!!');

  const { rows } = await pool.query(
    `
     INSERT INTO users (name, email, phone, password) 
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, phone
    `, [
    name,
    email,
    phone,
    encryptedPwd,
  ]);

  const newUser = rows[0];
  const token = generateToken(newUser.id)

  return { 
    message: 'User created successfully!!',
    token,
    user: newUser,
  };
};

export const loginUser = async (identifier: string, password: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1 OR phone = $1', [
    identifier,
  ]);

  const user: User = result.rows[0];
  if (!user) throw new Error('Invalid Credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid Credentials');

  const token = generateToken(user.id);
  return { 
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    message: 'Login Successfully!!'
  };
};
