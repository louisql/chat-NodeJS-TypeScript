import { Router } from "express";
import { validateRegistration } from "../middleware/validation.js";
import { registerUser, loginUser, getUserProfile } from "../controllers/auth.js";
import { authenticateJWT } from "../middleware/jwtMiddleware.js";

const router = Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', loginUser);

router.get('/profile', authenticateJWT,getUserProfile)

router.get('/', (req, res) => {
    res.send('In Express API')
})

export default router;