const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Caching static files path


// DB credentials
const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'hangman'
});

// DB conection
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});


// Pool of words to guess
let words = ['javascript', 'nodejs', 'express', 'mysql', 'docker']; 
// Selected word
let currentWord = words[Math.floor(Math.random() * words.length)];


//
// START endpoint
//
app.post('/start', (req, res) => {
  const { player } = req.body;
  const searchQuery = 'SELECT id, guessed_words FROM scores WHERE player = ?';
  db.query(searchQuery, [player], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ message: 'Welcome back!', playerId: results[0].id, guessedWords: results[0].guessed_words });
    } else {
      const insertQuery = 'INSERT INTO scores (player, guessed_words) VALUES (?, 0)';
      db.query(insertQuery, [player], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Game started!', playerId: result.insertId, guessedWords: 0 });
      });
    }
  });
});


//
// GUESS endpoint
//
app.post('/guess', (req, res) => {
  const { playerId, guess } = req.body;
  if (guess.toLowerCase() === currentWord) {
    const updateQuery = 'UPDATE scores SET guessed_words = guessed_words + 1 WHERE id = ?';
    db.query(updateQuery, [playerId], (err, result) => {
      if (err) throw err;
      const selectQuery = 'SELECT guessed_words FROM scores WHERE id = ?';
      db.query(selectQuery, [playerId], (err, results) => {
        if (err) throw err;
        currentWord = words[Math.floor(Math.random() * words.length)];
        res.json({ message: 'Correct!', guessedWords: results[0].guessed_words });
      });
    });
  } else {
    const selectQuery = 'SELECT guessed_words FROM scores WHERE id = ?';
    db.query(selectQuery, [playerId], (err, results) => {
      if (err) throw err;
      res.json({ message: 'Try again!', guessedWords: results[0].guessed_words });
    });
  }
});


//
// CURRENT-WORD endpoint
//
app.get('/current-word', (req, res) => {
  res.json({ currentWord: currentWord.replace(/./g, '_ ') });
});


//
// SERVER ENTRYPOINT
//
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
