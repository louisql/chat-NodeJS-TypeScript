//Middleware to protect routes by ckecking token in incoming request
import AppError from '../utils/app-error';
import jwt from 'jsonwebtoken';
var JWTSECRET = process.env.JWT_SECRET;
export function authenticateJWT(req, res, next) {
    var token = req.header('Authorization'); //will create auth route, will be coming from user login
    if (!token) {
        throw new AppError('Access denied. No token provided', 401);
    }
    if (!JWTSECRET) {
        throw new AppError('Token missing', 401);
    }
    try {
        var decoded = jwt.verify(token, JWTSECRET);
        req.user = decoded; //attaching data to the request for further use
        next();
    }
    catch (error) {
        throw new AppError('Invalid token', 401);
    }
}
