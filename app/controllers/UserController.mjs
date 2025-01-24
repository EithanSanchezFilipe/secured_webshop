import { emitWarning } from 'process';
import { user } from '../db/sequelize.mjs';

function get(req, res) {
  res.send('User: Sarah Test');
  console.log('aaa');
}

function post(req, res) {
  user.create({
    username: req.body.username,
    email: req.body.email,
    hashedPassword: req.body.password,
    salt: '',
  });
}
export { get, post };
