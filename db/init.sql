CREATE DATABASE hangman;

USE hangman;

CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player VARCHAR(255) NOT NULL,
  guessed_words INT NOT NULL
);
