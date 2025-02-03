import mysql from 'mysql2';

// Informations de connexion pour la db
export const db = mysql.createConnection({
  host: 'localhost',
  port: '6033',
  user: 'root',
  password: 'root',
  database: 'websecure',
});
