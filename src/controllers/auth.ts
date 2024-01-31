import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt' //using bcrypt for hash
import User from '../models/user.js';
import AppError from '../utils/app-error.js';

const JWTSECRET = process.env.JWT_SECRET;

//User registration
export async function registerUser(req: Request, res: Response): Promise<Response>{  
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword})
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully'})
    } catch (error){
        console.error(error);
        return res.status(500).json( {message: 'Internal server error'});
    }
}

// User Login
export async function loginUser(req: Request, res: Response): Promise<Response> {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email});
        if (!user) {
            throw new AppError('Invalid credentials', 401); // 401 Unauthorized
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch){
            throw new AppError('Invalid credentials', 401); // 401 Unauthorized
        }

        if (!JWTSECRET) {
            throw new Error('JWT secret is not defined in the environment variables');
        }

        const token = jwt.sign({ userId: user._id, email: user.email}, JWTSECRET, {
            expiresIn: '1h',
        });

        return res.status(200).json({ message: 'Login successful', token: token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error'})
    }
}

//Protected route - User Profile
export async function getUserProfile(req: Request, res: Response): Promise<Response>{
    try {
        //Accessing user data from request added by JWT
        const userData = req.user;

        const userProfile = await User.findById(userData.userId);

        if (!userProfile){
            throw new AppError('User profile not found', 404);
        }

        return res.json({ user: userProfile })
    } catch (error) {
        console.error(error);
        throw new AppError('Internal server error', 500);
    }
}

