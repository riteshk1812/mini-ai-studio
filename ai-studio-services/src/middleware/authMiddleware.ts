import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { ENV } from "../config/env";

interface JwtPayload {
    user: JwtPayload;
    id: number;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token is missing' })
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET as string) as JwtPayload;
        (req as any).user = decoded.user || decoded
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token!!' })
    }
}