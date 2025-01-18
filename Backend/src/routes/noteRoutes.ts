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
import authenticate from '../middleware/authencticate';


const router = Router();

router.get('/', authenticate, getNotes);
router.get('/deleted', authenticate, getDeletedNotes); // Hae poistetut muistiinpanot
router.post('/', authenticate, addNote);
router.put('/:id', authenticate, updateNote);
router.put('/restore/:id', authenticate, restoreNote); // Palauta muistiinpano
router.put('/delete/:id', authenticate, deleteNote); // Siirrä muistiinpano roskakoriin
router.delete('/:id', authenticate, permanentDeleteNote); // Poista pysyvästi

export default router;
