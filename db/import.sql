-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS websecure;

-- Utiliser la base de données créée
USE websecure;;

-- Créer la table t_user si elle n'existe pas
CREATE TABLE IF NOT EXISTS t_user (
    id_user INT AUTO_INCREMENT,
    Username VARCHAR(20) NOT NULL UNIQUE,
    HashedPassword VARCHAR(255) NOT NULL,
    Salt VARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	IsAdmin BOOLEAN DEFAULT FALSE
    PRIMARY KEY (id_user)
);

-- Optionnel : Ajouter un index pour optimiser la recherche sur useUsername
-- CREATE INDEX idx_username ON t_user(useUsername);
