import Sequelize, { DataTypes } from 'sequelize';
import { UserModel } from '../models/user.mjs';

const sequelize = new Sequelize(
  'websecure', // Nom de la DB qui doit exister
  'root', // Nom de l'utilisateur
  'root', // Mot de passe de l'utilisateur
  {
    host: 'localhost',
    //port: "6033", pour les conteneurs docker MySQL
    port: '6033',
    dialect: 'mysql',
    logging: false,
  }
);

const user = UserModel(sequelize, DataTypes);

const initDB = () => {
  return sequelize.sync({ alter: true }).then(() => {
    console.log('la base de données a été syncronisé');
  });
};
export { sequelize, initDB, user };
