const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: 'password',
    database: 'hangman'
  });

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

let words = ['javascript', 'nodejs', 'express', 'mysql', 'docker'];
let currentWord = words[Math.floor(Math.random() * words.length)];
let guessedWords = 0;

app.post('/guess', (req, res) => {
  const { guess } = req.body;
  if (guess.toLowerCase() === currentWord) {
    guessedWords++;
    currentWord = words[Math.floor(Math.random() * words.length)];
    res.json({ message: 'Correct!', guessedWords });
  } else {
    res.json({ message: 'Try again!', guessedWords });
  }
});

app.get('/current-word', (req, res) => {
  res.json({ currentWord: currentWord.replace(/./g, '_ ') });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
