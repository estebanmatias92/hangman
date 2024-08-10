document.addEventListener('DOMContentLoaded', () => {
    const guessForm = document.getElementById('guessForm');
    const currentWordElement = document.getElementById('currentWord');
    const messageElement = document.getElementById('message');
    const guessedWordsElement = document.getElementById('guessedWords');
  
    async function loadCurrentWord() {
      const response = await fetch('/current-word');
      const data = await response.json();
      currentWordElement.textContent = data.currentWord;
    }
  
    guessForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const guess = document.getElementById('guess').value;
  
      const response = await fetch('/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess })
      });
  
      const data = await response.json();
      messageElement.textContent = data.message;
      guessedWordsElement.textContent = data.guessedWords;
      loadCurrentWord();
    });
  
    loadCurrentWord();
  });
  