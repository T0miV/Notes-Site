import { Router } from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/userController';
import authenticate from '../middleware/authenticate';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update-password', authenticate, changePassword); // Suojaa reitti JWT-tunnistuksella

export default router;
