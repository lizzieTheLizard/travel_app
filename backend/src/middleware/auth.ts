import express, { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);

    // TODO: Verify JWT token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
