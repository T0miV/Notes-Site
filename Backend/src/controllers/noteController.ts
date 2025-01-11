import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
// import sqlite3 from 'sqlite3';  // SQLite import commented out

// Initialize Supabase client
const supabase = createClient('https://YOUR-SUPABASE-URL', 'YOUR-SUPABASE-KEY');

// Get all notes (Supabase version)
export const getNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'No notes found' });
  }

  res.json(data);
};

// Add a new note (Supabase version)
export const addNote = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
  const { title, text, color = '#ffeb3b' } = req.body;
  const timestamp = new Date().toISOString();

  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, text, timestamp, color, user_id: userId }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(400).json({ error: 'Note insertion failed' });
  }

  res.status(201).json(data[0]);
};

// Update a note (Supabase version)
export const updateNote = async (req: Request, res: Response) => {
  const { title, text, color } = req.body;
  const { data, error } = await supabase
    .from('notes')
    .update({ title, text, color })
    .eq('id', req.params.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(data[0]);
};

// Delete a note (Supabase version)
export const deleteNote = async (req: Request, res: Response) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', req.params.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).send();
};



//SQlite koodi (vanha)

// import { Request, Response } from 'express';
// import sqlite3 from 'sqlite3';
// import { Note } from '../models/note'; // Import Note type

// // Initialize the notes database
// const notesDb = new sqlite3.Database('./src/db/notes.db', (err) => {
//   if (err) {
//     console.error('Could not open notes database', err);
//   } else {
//     console.log('Notes database connected');

//     // Create notes table if it does not exist
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS notes (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT NOT NULL,
//       text TEXT NOT NULL,
//       timestamp TEXT NOT NULL,
//       color TEXT DEFAULT '#ffeb3b',
//       user_id INTEGER NOT NULL,
//       FOREIGN KEY (user_id) REFERENCES users (id)
// )
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

// // Get all notes
// export const getNotes = (req: Request, res: Response) => {
//   const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
//   const query = 'SELECT * FROM notes WHERE user_id = ?';

//   notesDb.all(query, [userId], (err, rows: Note[]) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// };

// // Add a new note
// export const addNote = (req: Request, res: Response) => {
//   const userId = (req as any).user.id; // Haetaan käyttäjän ID JWT-tokenista
//   const { title, text, color = '#ffeb3b' } = req.body as Omit<Note, 'id' | 'timestamp'>;
//   const timestamp = new Date().toISOString();
//   const query = 'INSERT INTO notes (title, text, timestamp, color, user_id) VALUES (?, ?, ?, ?, ?)';

//   notesDb.run(query, [title, text, timestamp, color, userId], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({ id: this.lastID, title, text, timestamp, color });
//   });
// };;

// // Update a note
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

// // Delete a note
// export const deleteNote = (req: Request, res: Response) => {
//   const query = 'DELETE FROM notes WHERE id = ?';

//   notesDb.run(query, [req.params.id], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(204).send();
//   });
// };

