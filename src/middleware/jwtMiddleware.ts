import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import jwt from 'jsonwebtoken';

export function authenticateJWT(req: Request, res: Response, next: NextFunction){
    const token = req.header('Authorization') 

    if (!token) {
        throw new AppError('Access denied. No token provided', 401)
    }

    if (!process.env.JWT_SECRET) {
        throw new AppError('Wrong token', 401)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded //attaching data to the request for further use
        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}