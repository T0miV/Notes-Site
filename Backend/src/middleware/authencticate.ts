import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the authenticate middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization required' });
  }

  try {
    // Verify token with JWT_SECRET and check for expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the decoded user data to the request object
    (req as any).user = decoded;
    
    next(); // Proceed to the next middleware or route handler
  } catch (err: any) {
    // If the token is expired or invalid, handle the error
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please login again' });
    } else {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
};

export default authenticate;