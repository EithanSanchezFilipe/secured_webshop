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
    //génère un sel
    const salt = await bcrypt.genSalt(10);

    //hash le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, salt);

    //ajoute l'utilisateur dans la db
    await user.create({
      username: username,
      email: email,
      hashedPassword: hashedPassword,
      salt: salt,
    });

    console.log('Utilisateur créé avec succès');
  } catch (err) {
    console.error('Erreur lors de la création:', err);
  }
}
export { get, register };
