import { emitWarning } from 'process';
import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import { db } from '../db/mysql.mjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();
db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('connexion a la base de données reussie');
});

async function register(req, res) {
  //Destructure l'objet req.body
  const { password, username, email } = req.body;
  const query = `INSERT INTO Users (username, email, hashedPassword, created) VALUES(?,?,?,?)`;
  try {
    //met la date au format qu'accepte mysql
    const currentDate = new Date().toISOString().slice(0, 19);
    //hash le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, 10);

    //execute la requete
    db.query(
      query,
      [username, email, hashedPassword, currentDate],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "L'utilisateur n'a pas pu être créé" });
        }
        return res
          .status(201)
          .json({ message: "L'utilisateur a été créé avec succès" });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erreur du serveur. Veuillez réessayer plus tard' });
  }
}

async function login(req, res) {
  //Destructure l'objet req.body
  const { password, username } = req.body;
  const hashedPassword = bcrypt.hash(password, 10);
  const query = 'SELECT * from Users WHERE username = ?';
  try {
    db.query(query, [username], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la connexion' });
      }
      //verifie si un utilisateur à été trouvé
      if (result.length === 0) {
        return res
          .status(400)
          .json({ message: "L'utilisateur indiqué n'existe pas" });
      }
      const loginUser = result[0];
      //compare les mots de passes
      const isPasswordValid = await bcrypt.compare(
        password,
        loginUser.hashedPassword
      );

      //vérifie que les mots de passe correspondent
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }
      const token = jwt.sign(
        { username: username, isAdmin: false },
        process.env.PRIVATE_KEY
      );
      return res.status(200).json({ message: 'Connexion reussie', token });
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Erreur du serveur. Veuillez réessayer plus tard` });
  }
}
export { register, login };
