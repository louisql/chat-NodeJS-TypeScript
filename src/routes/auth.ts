import { Router } from "express";
import { validateRegistration } from "../middleware/validation";
import { registerUser, loginUser } from "../controllers/auth";

const router = Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login, loginUser');

export default router;