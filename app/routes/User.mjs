import express from 'express';
import { get } from '../controllers/UserController';

const router = express();
router.get('/', get);
router.post('/login');
module.exports = router;

export { router };
