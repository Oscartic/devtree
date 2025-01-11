import type { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { verifyJWT } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error('Unauthorized');
    res.status(401).send({'error': error.message});
    return;
  };

  const [,token] = bearer.split(' ');

  if(!token) {
    const error = new Error('Unauthorized');
    res.status(401).send({'error': error.message});
    return;
  }

  try {
    const result = verifyJWT(token);
    if(typeof result === 'object' && result.hasOwnProperty('id')) {
      const user = await User.findById(result.id).select('-password');
      console.log(user);
      if(!user) {
        const error = new Error('User not found');
        res.status(404).send({error: error.message});
        return;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
    
  }
}