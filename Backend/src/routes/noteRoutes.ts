import { Router } from 'express';
import { getNotes, addNote, updateNote, deleteNote } from '../controllers/noteController';
import authenticate from '../middleware/authencticate';

const router = Router();

router.get('/', authenticate, getNotes);
router.post('/', authenticate, addNote);
router.put('/:id', authenticate, updateNote);
router.delete('/:id', authenticate, deleteNote);

export default router;