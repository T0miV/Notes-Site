import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import statsRoutes from './routes/statsRoutes';
import dotenv from 'dotenv';

// Lataa ympäristömuuttujat
dotenv.config();

// Luo Express-sovellus
const app = express();
const port = process.env.PORT || 5000; // Portti voidaan asettaa ympäristömuuttujasta

// CORS-konfiguraatio
const allowedOrigins = ['https://notes-site-app.vercel.app', 'http://localhost:3000']; // Separate the URLs into individual strings
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Sallitut HTTP-metodit
  credentials: true, // Salli evästeet ja todennustiedot
}));

// Middlewaret
app.use(express.json());

// Juuripolun reitti
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Notes App Backend</h1><p>The backend is up and running!</p><p>Available routes:</p><ul><li><a href="/users">/users</a></li><li><a href="/notes">/notes</a></li><li><a href="/stats">/stats</a></li></ul>');
});

// Reitit
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);
app.use('/stats', statsRoutes); 

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Exportoi Express-sovellus testejä tai muita käyttötapauksia varten
export default app;