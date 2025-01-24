import express from 'express';
import { get, post } from '../controllers/UserController.mjs';

const userRouter = express();
userRouter.get('/', get);
userRouter.post('/register', post);

export { userRouter };
