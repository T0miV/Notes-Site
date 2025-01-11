import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';

// Lataa ympäristömuuttujat
dotenv.config();

// Luo Express-sovellus
const app = express();

// Middlewaret
app.use(cors());
app.use(express.json());

// Pääsivureitti
app.get('/', (req, res) => {
  res.send('Backend is running'); // Tähän voit laittaa viestin, joka kertoo että palvelin on käynnissä
});

// Reitit
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Exportoi Express-sovellus Vercelille
export default app;
