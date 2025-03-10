import path from 'path';
import fs from 'fs';
import { createServer } from 'https';
import express from 'express';
import { fileURLToPath } from 'url';
import { userRouter } from './routes/User.mjs';
import { auth } from './auth/auth.mjs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());

const certifPath = path.join('./keys/server.crt');
const privKeyPath = path.join('./keys/server.key');

const CERTIFICAT = fs.readFileSync(certifPath, 'utf8');
const PRIVATE_KEY = fs.readFileSync(privKeyPath, 'utf8');

app.use(express.static(path.join('./views', 'css')));
app.use(express.static(path.join('./views', 'js')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

const server = createServer(
  {
    key: PRIVATE_KEY,
    cert: CERTIFICAT,
  },
  app
);
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.use('/api/user', userRouter);

app.use(auth);

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Démarrage du serveur
server.listen(443, () => {
  console.log('Server running on port https://localhost:443');
});
