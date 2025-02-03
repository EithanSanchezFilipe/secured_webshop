import express from 'express';
import { register, login } from '../controllers/UserController.mjs';

const userRouter = express();
userRouter.post('/register', register);
userRouter.post('/login', login);

export { userRouter };
