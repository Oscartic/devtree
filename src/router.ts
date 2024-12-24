import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';

const router = Router();

//Routing 
router.post('/auth/register',
  body('handle')
    .notEmpty()
    .withMessage('Handle is required'),
  body('name')
    .isEmail()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Email most be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password is too short (min 6 characters)'),
  createAccount,
);

router.post('/auth/login',
  body('email')
    .isEmail()
    .withMessage('Email most be a valid email address'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password is required)'),
  login
);


export default router;
