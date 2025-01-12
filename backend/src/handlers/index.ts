import type { Request, Response } from 'express';
import slug from 'slug';
import User from '../models/User';
import { hasHashedPassword, comparePassword } from '../utils/auth';
import { generateJWT } from '../utils/jwt';

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
      res.status(409).send({'error': 'Handle already exists'});
      return;
    }
    const user = new User(req.body);
    user.password = await hasHashedPassword(password);
    user.handle = handle;
    user.save();
    res.status(201).send({'error': 'User created successfully'});
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
    const token = generateJWT({id: identifyUser._id});

    res.status(200).send({'message': 'Login successful', token});
    return;
  } catch (error) {
    res.status(501).send({ error });
  }

};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send(req.user);
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description } = req.body;
    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if(handleExists && handleExists.email !== req.user.email) {
      const error = new Error('Handle already exists');
      res.status(409).send({'error': error.message});
      return;
    }
    // update user
    req.user.description = description;
    req.user.handle = handle;
    await req.user.save();
    res.status(200).send({ message: 'Profile updated successfully'});
  } catch (e) {
    const error = new Error('Error updating profile');
    res.status(501).send({ error: error.message });
  }
};
