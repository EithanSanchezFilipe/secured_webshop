import express from 'express';
import {
  register,
  login,
  logout,
  getInfo,
} from '../controllers/UserController.mjs';
import { auth } from '../auth/auth.mjs';

const userRouter = express();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', auth, logout);
userRouter.get('/', auth, getInfo);
export { userRouter };
