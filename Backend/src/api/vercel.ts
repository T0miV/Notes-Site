import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server'; // Tuodaan Express-sovellus

// Wrapper Vercelin serverless-funktiolle
export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any); // Kytketään Express-pyyntö ja -vastaus Vercelin kanssa
};
