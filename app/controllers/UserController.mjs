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

  }
}
export { get, register, login };
