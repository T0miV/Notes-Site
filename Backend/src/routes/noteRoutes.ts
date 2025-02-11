import { Router } from 'express';
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  getDeletedNotes,
  restoreNote,
  permanentDeleteNote,
  
} from '../controllers/noteController';
import authenticate from '../middleware/authenticate';


const router = Router();

router.get('/', authenticate, getNotes); // Get all notes from database
router.post('/', authenticate, addNote); // Add a new note to database
router.put('/:id', authenticate, updateNote); // Update a note in database
router.put('/delete/:id', authenticate, deleteNote); // Move note to trash
router.get('/deleted', authenticate, getDeletedNotes); // Get deleted notes on "deleted notes page"
router.put('/restore/:id', authenticate, restoreNote); // Restore a deleted note back to the main list
router.delete('/:id', authenticate, permanentDeleteNote); // Permanently delete a note from database


export default router;
