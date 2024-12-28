import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import slug from 'slug';
import User from '../models/User';
import { hasHashedPassword, comparePassword } from '../utils/auth';

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error('User already exists');
      res.status(409).send({'error': error.message});
      return;
    }
    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if(handleExists) {
      res.status(409).send({'message': 'Handle already exists'});
      return;
    }
    const user = new User(req.body);
    user.password = await hasHashedPassword(password);
    user.handle = handle;
    user.save();
    res.status(201).send({'message': 'User created successfully'});
  } catch (error) {
    res.status(501).send({ error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // is user registered?
    const identifyUser = await User.findOne({ email });
    if (!identifyUser) {
      const error = new Error('Unregistered User');
      res.status(404).send({'error': error.message});
      return;
    }
    // is password correct?
    console.log(identifyUser.password);
    const compare = await comparePassword(password, identifyUser.password)
    console.log(compare);
    if (!compare) {
      const error = new Error('Incorrect password');
      res.status(401).send({'error': error.message});
      return;
    }
    res.status(200).send({'message': 'Login successful'});
    return;
  } catch (error) {
    res.status(501).send({ error });
  }

};
