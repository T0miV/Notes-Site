import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';

// Lataa ympäristömuuttujat
dotenv.config();

// Luo Express-sovellus
const app = express();
const port = process.env.PORT || 5000;

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

if (process.env.NODE_ENV !== 'production') {
  // Paikallinen kehitysympäristö: käynnistä palvelin
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Exportoi oletuksena Express-sovellus
export default app;
