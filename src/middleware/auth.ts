import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { env } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email?: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.userId ?? payload.sub ?? payload.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: Invalid token payload format' });
      return;
    }

    req.user = {
      id: Number(userId),
      email: payload.email as string | undefined,
    };

    next();
  } catch (_error) {
    res.status(401).json({ error: 'Unauthorized: Token expired or invalid' });
  }
};
