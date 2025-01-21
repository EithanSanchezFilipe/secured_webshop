import { join } from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import express from 'express';
import userRoute from './routes/User';

const app = express();

app.use(json());
const certifPath = join(__dirname, '/keys/certificate.crt');
const privKeyPath = join(__dirname, '/keys/private.key');

const CERTIFICAT = readFileSync(certifPath, 'utf8');
const PRIVATE_KEY = readFileSync(privKeyPath, 'utf8');

app.use(express.static(join('./public', 'css')));
app.use(express.static(join('./public', 'js')));

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

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
});

// Démarrage du serveur
server.listen(8080, () => {
  console.log('Server running on port https://localhost:8080');
});
