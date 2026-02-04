import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// TODO: Define the JWT payload interface
interface JwtPayload {
  // TODO: Add user properties (id, email, username)
}

// TODO: Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      // TODO: Add user property
      // user?: { id: number; email: string; username: string };
    }
  }
}

// TODO: Create the authenticate middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Get token from Authorization header
  // Hint: const authHeader = req.headers.authorization;

  // TODO: Check if token exists
  // If no token, return 401 with message "No token provided"

  // TODO: Extract token from "Bearer TOKEN" format
  // Hint: const token = authHeader.split(' ')[1];

  // TODO: Verify and decode the token
  // Use try-catch block
  // jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

  // TODO: If verification fails, return 401 with message "Invalid token"

  // TODO: If successful, attach user info to req.user and call next()
};
