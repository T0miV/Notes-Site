import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

// Define the User type
type User = {
  id: number;
  username: string;
  password: string;
  role: number;
};

// Initialize SQLite database for users
const usersDb = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Could not open users database', err);
  } else {
    console.log('Users database connected');
  }
});

// Ensure the 'users' table exists
usersDb.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role INTEGER DEFAULT 1
  );`
);

// Register a new user
export const registerUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    usersDb.run(query, [username, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error saving user' });
      }

      res.status(201).json({ id: this.lastID, username });
    });
  });
};

// Login a user
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  usersDb.get(query, [username], (err, user: User | undefined) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({ username: user.username, role: user.role, userId: user.id });
    });
  });
};

// Fetch all users (admin functionality)
export const getAllUsers = (req: Request, res: Response) => {
  const query = 'SELECT id, username, role FROM users'; // Exclude password for security

  usersDb.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json(rows);
  });
};
