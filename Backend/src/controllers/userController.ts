import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db/db'; // Käytetään PostgreSQL-kyselyjä
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Rekisteröi uusi käyttäjä
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: unknown) {
    // Tarkistetaan, että virhe on Error-tyyppiä
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Tuntematon virhe' });
    }
  }
};

// Kirjaudu sisään
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, username: user.username, role: user.role, userId: user.id });
  } catch (err: unknown) {
    // Tarkistetaan, että virhe on Error-tyyppiä
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Tuntematon virhe' });
    }
  }
};



// import { Request, Response } from 'express';
// import sqlite3 from 'sqlite3';
// import bcrypt from 'bcryptjs';
// import { User } from '../models/user'; // Import User type
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Initialize SQLite database for users
// const usersDb = new sqlite3.Database('./src/db/users.db', (err) => {
//   if (err) {
//     console.error('Could not open users database', err);
//   } else {
//     console.log('Users database connected');

//     // Create users table if it does not exist
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL,
//         role TEXT DEFAULT 'user'
//       )
//     `;
//     usersDb.run(createTableQuery, (err) => {
//       if (err) {
//         console.error('Error creating users table', err);
//       } else {
//         console.log('Users table created or already exists');
//       }
//     });
//   }
// });

// // Register a new user
// export const registerUser = (req: Request, res: Response) => {
//   const { username, password } = req.body as Omit<User, 'id' | 'role'>;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error hashing password' });
//     }

//     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     usersDb.run(query, [username, hashedPassword], function (err) {
//       if (err) {
//         return res.status(500).json({ error: 'Error saving user' });
//       }

//       res.status(201).json({ id: this.lastID, username });
//     });
//   });
// };

// // Login a user
// export const loginUser = (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE username = ?';
//   usersDb.get(query, [username], (err, user: User | undefined) => {
//     if (err) {
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error comparing passwords' });
//       }

//       if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//       }

//       // Generate JWT token with the user's ID and role
//       const token = jwt.sign(
//         { id: user.id, username: user.username, role: user.role }, 
//         process.env.JWT_SECRET as string,  // Use JWT_SECRET from .env file
//         { expiresIn: '1h' }  // Token will expire in 1 hour
//       );

//       // Return the token along with user info
//       res.status(200).json({ token, username: user.username, role: user.role, userId: user.id });
//     });
//   });
// };

// // Fetch all users (admin functionality)
// export const getAllUsers = (req: Request, res: Response) => {
//   const query = 'SELECT id, username, role FROM users'; // Exclude password for security

//   usersDb.all(query, (err, rows: Omit<User, 'password'>[]) => { // Use User type without password
//     if (err) {
//       return res.status(500).json({ error: 'Database error' });
//     }

//     res.status(200).json(rows);
//   });
// };
