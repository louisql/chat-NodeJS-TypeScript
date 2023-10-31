import { Request, Response } from 'express';
import bcrypt from 'bcrypt' //using bcrypt for hash
import User from '../models/user';

//User registration
export async function registerUser(req: Request, res: Response): Promise<Response>{  
    try {
        const { username, email, password } = req.body;
        const exitingUser = await User.findOne({ email});
        if (exitingUser) {
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
async function loginUser(req: Request, res: Response): Promise<Response> {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        return res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error'})
    }
}

export default {
    registerUser,
    loginUser,
};