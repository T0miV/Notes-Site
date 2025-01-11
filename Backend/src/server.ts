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

// Käynnistä palvelin riippumatta ympäristöstä
app.listen(port, () => {
  console.log(`✅ Backend is running and available at http://localhost:${port} (or your deployment URL in production).`);
  console.log('✅ Backend is successfully connected and operational!');
});

// Exportoi Express-sovellus testejä tai muita käyttötapauksia varten
export default app;
