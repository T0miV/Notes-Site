import { Request, Response } from 'express';
import { Note } from '../models/note';
import { supabase } from '../db';

// Get all notes from database, excluding deleted ones
export const getNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .eq('isDeleted', false);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
};

// Get all deleted notes from database
export const getDeletedNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .eq('isDeleted', true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
};

// Add a new note to database
// Lisää uusi muistiinpano tietokantaan
export const addNote = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title, text, color = '#1976d2', isBold, isItalic, isUnderline } = 
    req.body as Omit<Note, 'id' | 'timestamp' | 'user_id'>;

  const timestamp = new Date().toISOString();

  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, text, timestamp, color, isBold, isItalic, isUnderline, user_id: userId }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data[0]);
};

// Päivittää olemassa olevan muistiinpanon
export const updateNote = async (req: Request, res: Response) => {
  const { title, text, color, isBold, isItalic, isUnderline } = 
    req.body as Omit<Note, 'id' | 'timestamp' | 'user_id'>;
  
  const noteId = req.params.id;

  const { data, error } = await supabase
    .from('notes')
    .update({ title, text, color, isBold, isItalic, isUnderline })
    .eq('id', noteId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
};


// Mark a note as deleted, by changing isDeleted to true
export const deleteNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;

  const { data, error } = await supabase
    .from('notes')
    .update({ isDeleted: true })
    .eq('id', noteId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: 'Note moved to trash' });
};

// Restore a deleted note, by changing isDeleted to false
export const restoreNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;

  const { data, error } = await supabase
    .from('notes')
    .update({ isDeleted: false })
    .eq('id', noteId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: 'Note restored' });
};

// Permanently delete a note from database
export const permanentDeleteNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(204).send();
};



/* // Old code with sqlite */


// import { Request, Response } from 'express';
// import sqlite3 from 'sqlite3';
// import { Note } from '../models/note';

// // Initialize SQLite database for notes
// const notesDb = new sqlite3.Database('./src/db/notes.db', (err) => {
//   if (err) {
//     console.error('Could not open notes database', err);
//   } else {
//     console.log('Notes database connected');
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS notes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT NOT NULL,
//         text TEXT NOT NULL,
//         timestamp TEXT NOT NULL,
//         color TEXT DEFAULT '#ffeb3b',
//         user_id INTEGER NOT NULL,
//         isDeleted BOOLEAN DEFAULT FALSE,
//         FOREIGN KEY (user_id) REFERENCES users (id)
//       )
//     `;
//     notesDb.run(createTableQuery, (err) => {
//       if (err) {
//         console.error('Error creating notes table', err);
//       } else {
//         console.log('Notes table created or already exists');
//       }
//     });
//   }
// });

// // Get all notes from database, excluding deleted ones
// export const getNotes = (req: Request, res: Response) => {
//   const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
//   const query = 'SELECT * FROM notes WHERE user_id = ? AND isDeleted = FALSE';

//   notesDb.all(query, [userId], (err, rows: Note[]) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// };

// // Get all deleted notes from database
// export const getDeletedNotes = (req: Request, res: Response) => {
//   const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
//   const query = 'SELECT * FROM notes WHERE user_id = ? AND isDeleted = TRUE';

//   notesDb.all(query, [userId], (err, rows: Note[]) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// };

// // Add a new note to database
// export const addNote = (req: Request, res: Response) => {
//   const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
//   const { title, text, color = '#1976d2' } = req.body as Omit<Note, 'id' | 'timestamp'>;
//   const timestamp = new Date().toISOString();
//   const query = 'INSERT INTO notes (title, text, timestamp, color, user_id) VALUES (?, ?, ?, ?, ?)';

//   notesDb.run(query, [title, text, timestamp, color, userId], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({ id: this.lastID, title, text, timestamp, color });
//   });
// };

// // Update a note in database
// export const updateNote = (req: Request, res: Response) => {
//   const { title, text, color } = req.body as Omit<Note, 'id' | 'timestamp'>;
//   const query = 'UPDATE notes SET title = ?, text = ?, color = ? WHERE id = ?';

//   notesDb.run(query, [title, text, color, req.params.id], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ id: req.params.id, title, text, color });
//   });
// };

// // Mark a note as deleted, by changing isDeleted to true
// export const deleteNote = (req: Request, res: Response) => {
//   const query = 'UPDATE notes SET isDeleted = TRUE WHERE id = ?';

//   notesDb.run(query, [req.params.id], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: 'Note moved to trash' });
//   });
// };

// // Restore a deleted note, by changing isDeleted to false
// export const restoreNote = (req: Request, res: Response) => {
//   const query = 'UPDATE notes SET isDeleted = FALSE WHERE id = ?';

//   notesDb.run(query, [req.params.id], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: 'Note restored' });
//   });
// };

// // Permanently delete a note from database
// export const permanentDeleteNote = (req: Request, res: Response) => {
//   const query = 'DELETE FROM notes WHERE id = ?';

//   notesDb.run(query, [req.params.id], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(204).send();
//   });
// };

