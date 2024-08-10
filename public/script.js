document.addEventListener('DOMContentLoaded', () => {

  //
  // Get FORM element's stored as JS OBJECTS to be manipulated later
  //
  const startForm = document.getElementById('startForm');
  const guessForm = document.getElementById('guessForm');
  const currentWordElement = document.getElementById('currentWord');
  const messageElement = document.getElementById('message');
  const guessedWordsElement = document.getElementById('guessedWords');
  let playerId; // Empty for now


  //
  // First form SUBMIT action
  //
  startForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const player = document.getElementById('player').value;

    // Send a request to get a response (object) for the START ENDPOINT
    const response = await fetch('/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player })
    });

    // Get the data as JSON from the response (object)
    const data = await response.json();
    // USE the DATA object to FILL the FORM FIELDS
    playerId = data.playerId;
    messageElement.textContent = data.message;
    guessedWordsElement.textContent = data.guessedWords;
    startForm.style.display = 'none';
    guessForm.style.display = 'block';

    // Updating STATUS of HIDDEN WORD????
    loadCurrentWord();
  });


  //
  // Second FORM SUBMIT action
  //
  guessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const guess = document.getElementById('guess').value;

    // Send a request to get a response for the GUESS ENDPOINT
    const response = await fetch('/guess', {
      method: 'POST',                                   // method
      headers: {                                        // headers
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerId, guess })         // and body are the meta-data and data transacted in HTTP messages
    });

    // Get the data as JSON from the response (object)
    const data = await response.json();

    // USE the DATA object to FILL the FORM FIELDS
    messageElement.textContent = data.message;
    guessedWordsElement.textContent = data.guessedWords;

    // Updating STATUS of HIDDEN WORD????
    loadCurrentWord();
  });


  //
  // Async ACTION for updating the hidden word
  //
  async function loadCurrentWord() {
    // Send a request to get a response for the START ENDPOINT
    const response = await fetch('/current-word');

    // Get the data as JSON from the response (object)
    const data = await response.json();

    // USE the DATA object to FILL the FORM FIELDS
    currentWordElement.textContent = data.currentWord;
  }
});
