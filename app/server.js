const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const userRoute = require('./routes/User');


const app = express();

app.use('/user', userRoute);

const certifPath = path.join(__dirname, '/keys/certificate.crt');
const privKeyPath = path.join(__dirname, '/keys/private.key');

const CERTIFICAT = fs.readFileSync(certifPath, 'utf8');
const PRIVATE_KEY = fs.readFileSync(privKeyPath, 'utf8');



const server = https.createServer({
    key: PRIVATE_KEY,
    cert: CERTIFICAT
}, app);

// Démarrage du serveur
server.listen(8080, () => {
    console.log('Server running on port 8080');
});