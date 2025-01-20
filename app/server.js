const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const userRoute = require('./routes/User');

const app = express();

app.use(express.json());
const certifPath = path.join(__dirname, '/keys/certificate.crt');
const privKeyPath = path.join(__dirname, '/keys/private.key');

const CERTIFICAT = fs.readFileSync(certifPath, 'utf8');
const PRIVATE_KEY = fs.readFileSync(privKeyPath, 'utf8');

app.use(express.static(path.join('./public', 'css')));
app.use(express.static(path.join('./public', 'js')));

const server = https.createServer(
  {
    key: PRIVATE_KEY,
    cert: CERTIFICAT,
  },
  app
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
});

// Démarrage du serveur
server.listen(8080, () => {
  console.log('Server running on port https://localhost:8080');
});
