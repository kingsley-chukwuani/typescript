import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
  user?: { roles?: string[] };
}

export default function (req: RequestWithUser, res: Response, next: NextFunction) {
  if (!req.user || !req.user.roles) {
    return res.status(401).send('Authentication required');
  }

  if (!req.user.roles.includes('admin')) {
    return res.status(403).send('Access denied.');
  }

  next();
};