import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server'; // Importoi Express-sovellus server.ts:stä

// Wrapper Vercelin serverless-funktiolle
export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any); // Vercelin pyynnöt ja vastaukset kytketään Express-sovellukseen
};

