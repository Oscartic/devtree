import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const handlerInputErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
    return;
  }
  next();
} 