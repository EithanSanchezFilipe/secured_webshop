import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();
const auth = (req, res, next) => {
  //vérifie que l'utilisateur possède un token
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader.split(' ')[1];
    //déchiffre le token et verifie sa validité
    const decodedToken = jwt.verify(
      process.env.PRIVATE_KEY,
      privateKey,
      (error, decodedToken) => {
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }
      }
    );
  }
};
export { auth };
