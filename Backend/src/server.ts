import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';

// Lataa ympäristömuuttujat
dotenv.config();

// Luo Express-sovellus
const app = express();
const port = process.env.PORT || 5000; // Portti voidaan asettaa ympäristömuuttujasta

// Middlewaret
app.use(cors());
app.use(express.json());

// Reitit
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Pääsivu ("/") näyttää "Backend is running" -viestin
app.get('/', (req, res) => {
  res.send('<h1>Backend is running</h1>');  // HTML-elementti näyttää tekstin
});

if (process.env.NODE_ENV !== 'production') {
  // Paikallinen kehitysympäristö: käynnistä palvelin
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Exportoi oletuksena Express-sovellus
export default app;
