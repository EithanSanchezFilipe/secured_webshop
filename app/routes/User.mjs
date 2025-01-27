import express from 'express';
import { get, register, login } from '../controllers/UserController.mjs';

const userRouter = express();
userRouter.get('/', get);
userRouter.post('/register', register);
userRouter.post('/login', login);

export { userRouter };
