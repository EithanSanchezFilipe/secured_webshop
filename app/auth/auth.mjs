import jwt from 'jsonwebtoken';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
env.config();
const auth = (req, res, next) => {
  //vérifie que l'utilisateur possède un token
  const token = req.cookies.token;
  if (!token) {
    res.redirect('/login');
  } else {
    //déchiffre le token et verifie sa validité
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decodedToken) => {
      if (error) {
        const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
        return res.status(401).json({ message, data: error });
      }
      req.user = decodedToken;
      next();
    });
  }
};
export { auth };
