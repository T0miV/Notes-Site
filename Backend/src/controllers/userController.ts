import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { supabase } from '../db'; // Tuo Supabase Client

dotenv.config();

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as Omit<User, 'id' | 'role'>;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword, role: 0 }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data[0]);
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    return res.status(500).json({ error: 'Database error' });
  }

  if (!data) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: data.id, username: data.username, role: data.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token, username: data.username, role: data.role, userId: data.id });
};

// Fetch all users (admin functionality)
export const getAllUsers = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, role');

  if (error) {
    return res.status(500).json({ error: 'Database error' });
  }
  res.status(200).json(data);
};


//Pasword change function
export const changePassword = async (req: Request, res: Response) => {
  
  const { oldPassword, newPassword } = req.body;
  const userId = (req as any).user.id; //Get user ID from JWT

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Old and new passwords are required' });
  }

  //Search user from Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('password')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: 'User not found' });
  }

  //Checking whether the old password matches the hash in the database
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Old password is incorrect' });
  }

  //Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  //Update password to Supabase
  const { error: updateError } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('id', userId);

  if (updateError) {
    return res.status(500).json({ error: 'Failed to update password' });
  }

  res.status(200).json({ message: 'Password updated successfully' });
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
//         role INTEGER DEFAULT 0
// )

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

//     const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
// usersDb.run(query, [username, hashedPassword, 0], function (err) { // role number 1 means admin account
//   if (err) {
//     return res.status(500).json({ error: 'Error saving user' });
//   }

//   res.status(201).json({ id: this.lastID, username });
// });

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

