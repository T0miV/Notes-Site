import { Router } from 'express';
import { getNotes, addNote, updateNote, deleteNote } from '../controllers/noteController';

const router = Router();

router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
