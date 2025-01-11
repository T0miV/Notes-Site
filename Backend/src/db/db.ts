import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Yhdistä Supabasen PostgreSQL-tietokantaan
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Supabase tietokannan URL
  ssl: {
    rejectUnauthorized: false,
  },
});

// Käytä poolia tietokantakyselyihin
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
