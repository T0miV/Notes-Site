import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';
dotenv.config();  // This loads all environment variables from the .env file


// Create express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
