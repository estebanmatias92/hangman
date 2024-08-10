document.addEventListener('DOMContentLoaded', () => {
  const startForm = document.getElementById('startForm');
  const guessForm = document.getElementById('guessForm');
  const currentWordElement = document.getElementById('currentWord');
  const messageElement = document.getElementById('message');
  const guessedWordsElement = document.getElementById('guessedWords');
  let playerId;

  startForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const player = document.getElementById('player').value;

    const response = await fetch('/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player })
    });

    const data = await response.json();
    playerId = data.playerId;
    messageElement.textContent = data.message;
    guessedWordsElement.textContent = data.guessedWords;
    startForm.style.display = 'none';
    guessForm.style.display = 'block';
    loadCurrentWord();
  });

  guessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const guess = document.getElementById('guess').value;

    const response = await fetch('/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerId, guess })
    });

    const data = await response.json();
    messageElement.textContent = data.message;
    guessedWordsElement.textContent = data.guessedWords;
    loadCurrentWord();
  });

  async function loadCurrentWord() {
    const response = await fetch('/current-word');
    const data = await response.json();
    currentWordElement.textContent = data.currentWord;
  }
});
