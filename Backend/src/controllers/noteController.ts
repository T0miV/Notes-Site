import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

// Initialize the notes database
const notesDb = new sqlite3.Database('./notes.db', (err) => {
  if (err) console.error('Could not open notes database', err);
});

// Get all notes
export const getNotes = (req: Request, res: Response) => {
  notesDb.all('SELECT * FROM notes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Add a new note
export const addNote = (req: Request, res: Response) => {
  const { title, text, color = '#ffeb3b' } = req.body;
  const timestamp = new Date().toISOString();
  const query = 'INSERT INTO notes (title, text, timestamp, color) VALUES (?, ?, ?, ?)';

  notesDb.run(query, [title, text, timestamp, color], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, text, timestamp, color });
  });
};

// Update a note
export const updateNote = (req: Request, res: Response) => {
  const { title, text, color } = req.body;
  const query = 'UPDATE notes SET title = ?, text = ?, color = ? WHERE id = ?';

  notesDb.run(query, [title, text, color, req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: req.params.id, title, text, color });
  });
};

// Delete a note
export const deleteNote = (req: Request, res: Response) => {
  const query = 'DELETE FROM notes WHERE id = ?';

  notesDb.run(query, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};
