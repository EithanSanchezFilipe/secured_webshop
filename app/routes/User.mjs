import express from 'express';
import { register, login, logout } from '../controllers/UserController.mjs';

const userRouter = express();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export { userRouter };
