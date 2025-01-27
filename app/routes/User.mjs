import express from 'express';
import { get, register } from '../controllers/UserController.mjs';

const userRouter = express();
userRouter.get('/', get);
userRouter.post('/register', register);

export { userRouter };
