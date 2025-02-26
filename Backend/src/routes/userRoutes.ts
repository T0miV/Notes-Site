import { Router } from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/userController';
import authenticate from '../middleware/authenticate';

const router = Router();

router.post('/register', registerUser); //Register a new user
router.post('/login', loginUser); //Login a user
router.post('/update-password', authenticate, changePassword); // Change password

export default router;
