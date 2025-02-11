import { Router } from 'express';
import { getStats } from '../controllers/statsController';
import authenticate from '../middleware/authenticate';

const router = Router();

// Tilastojen reitti
router.get('/', authenticate, getStats); // Get statistics about notes

export default router;