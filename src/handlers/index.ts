import type { Request, Response } from 'express';
import User from '../models/User';

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).send({'code status:': 400, 'message': 'User already exists'});
      return;
    }
    const result = await User.create(req.body);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}