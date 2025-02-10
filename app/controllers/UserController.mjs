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
  const query = `INSERT INTO Users (username, email, hashedPassword, created, salt) VALUES(?,?,?,?,?)`;
  try {
    //met la date au format qu'accepte mysql
    const currentDate = new Date().toISOString().slice(0, 19);
    //hash le mot de passe avec le sel
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password + process.env.PEPPER,
      salt
    );

    //execute la requete
    db.query(
      query,
      [username, email, hashedPassword, currentDate, salt],
      (err, result) => {
        if (err) {
          return res.status(500).redirect('/register');
        }
        return res.status(201).redirect('/');
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
  console.log(req.body);
  const query = 'SELECT * from Users WHERE username = ?';
  try {
    db.query(query, [username], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la connexion' });
      }
      //verifie si un utilisateur à été trouvé
      if (result.length === 0) {
        return res.status(400).redirect('/');
      }
      const loginUser = result[0];
      //hash le mot de passe pour pouvoir les comparer
      const hashedPassword = bcrypt.hashSync(
        password + process.env.PEPPER,
        loginUser.salt
      );

      //vérifie que les mots de passe correspondent
      if (hashedPassword !== loginUser.hashedPassword) {
        return res.status(400).redirect('/');
      }
      const token = jwt.sign(
        { username: username, isAdmin: false },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '1d',
        }
      );
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).redirect('/');
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Erreur du serveur. Veuillez réessayer plus tard` });
  }
}
function logout(req, res) {
  if (req.cookies.token) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });
    return res.status(200).redirect('/');
  } else {
    res.status(400).json({
      message: `Vous n'êtes pas connecté. Veuillez vous connecter avant d'effectuer cette operation`,
    });
  }
}
function getInfo(req, res) {
  const userId = req.user.id;
  const query = `SELECT username, email FROM Users WHERE id = ?`;
  try {
    //execute la requete
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message:
            "Les informations de l'utilisateur n'ont pas pu être récupérés",
        });
      }
      const user = result[0];
      return res.status(201).json({
        message: "Les informations de l'utilisateur ont pu être récupérés",
        data: user,
      });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erreur du serveur. Veuillez réessayer plus tard' });
  }
}
export { register, login, logout, getInfo };
