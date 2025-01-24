import { join } from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import express from 'express';
import { fileURLToPath } from 'url';
import { userRouter } from './routes/User.mjs';
import { sequelize, initDB } from './db/sequelize.mjs';

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const certifPath = join(__dirname, '/keys/certificate.crt');
const privKeyPath = join(__dirname, '/keys/private.key');

const CERTIFICAT = readFileSync(certifPath, 'utf8');
const PRIVATE_KEY = readFileSync(privKeyPath, 'utf8');

app.use(express.static(join('./public', 'css')));
app.use(express.static(join('./public', 'js')));

try {
  await sequelize.authenticate();
  console.log('La connexion à la base de données a bien été établie');

  //initialise la db
  await initDB();
} catch {
  console.error('impossible de se connecter à la base de données');
}

const server = createServer(
  {
    key: PRIVATE_KEY,
    cert: CERTIFICAT,
  },
  app
);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, './public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(join(__dirname, './public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(join(__dirname, './public', 'register.html'));
});

app.use('/api/user', userRouter);

// Démarrage du serveur
server.listen(8080, () => {
  console.log('Server running on port https://localhost:8080');
});
