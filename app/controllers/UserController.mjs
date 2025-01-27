import { emitWarning } from 'process';
import { user } from '../db/sequelize.mjs';
import bcrypt from 'bcrypt';

function get(req, res) {
  res.send('User: Sarah Test');
  console.log('aaa');
}

async function register(req, res) {
  //Destructure l'objet req.body
  const { password, username, email } = req.body;
  try {
    //hash le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, 10);

    //ajoute l'utilisateur dans la db
    await user.create({
      username: username,
      email: email,
      hashedPassword: hashedPassword,
    });

    console.log('Utilisateur créé avec succès');
    res.status(201).json({ message: "l'utilisateur à été créé avec succès" });
  } catch (err) {
    console.error('Erreur lors de la création:', err);
    res.status(500).json({ message: 'Erreur interne' });
  }
}

async function login(req, res) {
  //Destructure l'objet req.body
  const { password, username } = req.body;
  try {
    const loginUser = await user.findOne({ where: { username } });

    //verifie si un utilisateur à été trouvé
    if (!loginUser) {
      return res
        .status(400)
        .json({ message: "L'utilisateur indiqué n'existe pas" });
    }

    //compare les mots de passes
    const isPasswordValid = await bcrypt.compare(
      password,
      loginUser.hashedPassword
    );

    //vérifie que les mots de passe correspondent
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    return res.status(200).json({ message: 'Connexion reussie' });
  } catch (e) {
    console.error('Erreur lors de la connexion:');
    res.status(500).json({ message: `Erreur interne ${e}` });
  }
}
export { get, register, login };
