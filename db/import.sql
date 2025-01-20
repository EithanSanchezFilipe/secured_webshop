-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS websecure;

-- Utiliser la base de données créée
USE websecure;

-- Créer la table t_user si elle n'existe pas
CREATE TABLE IF NOT EXISTS t_user (
    id_user INT AUTO_INCREMENT,  -- Utilisation de AUTO_INCREMENT pour l'ID
    Username VARCHAR(20) NOT NULL UNIQUE,  -- Username unique
    HashedPassword VARCHAR(255) NOT NULL,  -- Mot de passe hashé
    Salt VARCHAR(255) NOT NULL,  -- Sel pour le mot de passe
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Date de création, valeur par défaut
    IsAdmin BOOLEAN DEFAULT FALSE,  -- Boolean indiquant si l'utilisateur est admin
    PRIMARY KEY (id_user)  -- Définition de la clé primaire
);
