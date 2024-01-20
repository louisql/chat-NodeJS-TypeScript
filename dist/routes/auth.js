import { Router } from "express";
import { validateRegistration } from "../middleware/validation";
import { registerUser, getUserProfile } from "../controllers/auth";
import { authenticateJWT } from "../middleware/jwtMiddleware";
var router = Router();
router.post('/register', validateRegistration, registerUser);
router.post('/login, loginUser');
router.get('/profile', authenticateJWT, getUserProfile);
export default router;
