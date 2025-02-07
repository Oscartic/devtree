import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, getUser, login, updateProfile, uploadImage } from './handlers';
import { handlerInputErrors } from './middleware/validations';
import { authenticate } from './middleware/auth';

const router = Router();

//Routing 
router.post('/auth/register',
  body('handle')
    .notEmpty()
    .withMessage('Handle is required'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Email most be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password is too short (min 6 characters)'),
  handlerInputErrors,
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
    handlerInputErrors,
  login
);

router.get('/user', authenticate, getUser);

router.patch('/user',
  body('handle')
    .notEmpty()
    .withMessage('Handle is required'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  handlerInputErrors,
  authenticate,
  updateProfile,
);

router.post('/user/image', authenticate, uploadImage);

export default router;
