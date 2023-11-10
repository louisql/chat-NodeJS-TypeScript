//Middleware to protect routes by ckecking token in incoming request

import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import jwt from 'jsonwebtoken';

const JWTSECRET = process.env.JWT_SECRET;

export function authenticateJWT(req: Request, res: Response, next: NextFunction){
    const token = req.header('Authorization') //will create auth route, will be coming from user login

    if (!token) {
        throw new AppError('Access denied. No token provided', 401)
    }

    if (!JWTSECRET) {
        throw new AppError('Token missing', 401)
    }

    try {
        const decoded = jwt.verify(token, JWTSECRET)
        req.user = decoded //attaching data to the request for further use
        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}