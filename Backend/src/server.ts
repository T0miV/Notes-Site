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

// Juuripolun reitti
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Notes App Backend</h1><p>The backend is up and running!</p><p>Available routes:</p><ul><li><a href="/users">/users</a></li><li><a href="/notes">/notes</a></li></ul>');
});

// Reitit
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Käynnistä palvelin riippumatta ympäristöstä
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Exportoi Express-sovellus testejä tai muita käyttötapauksia varten
export default app;
