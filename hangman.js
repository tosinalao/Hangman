function startHangman() {
    window.location.href = 'game.html'; // Redirect to the Hangman game page
}

const words = ['television', 'unicorn', 'friends', 'pineapple', 'water'];

let selectedWord = '';
let displayedWord = [];
let attemptsLeft = 6;
let guessedLetters = [];

const wordDisplayElement = document.getElementById('word-display');
const attemptsLeftElement = document.getElementById('attempts-left');
const letterInputElement = document.getElementById('letter-input');

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = selectedWord.split('').map(() => '_');
    attemptsLeft = 6;
    guessedLetters = [];

    updateDisplay();
}

function updateDisplay() {
    wordDisplayElement.textContent = displayedWord.join(' ');
    attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;
}

function makeGuess() {
    if (attemptsLeft > 0 && letterInputElement.value.length === 1) {
        const guess = letterInputElement.value.toLowerCase();

        if (!guessedLetters.includes(guess)) {
            guessedLetters.push(guess);

            if (!selectedWord.includes(guess)) {
                attemptsLeft--;
            }

            displayedWord = selectedWord.split('').map(letter =>
                guessedLetters.includes(letter) ? letter : '_'
            );

            updateDisplay();

            if (!displayedWord.includes('_')) {
                setTimeout(() => {
                    alert('Congratulations! You guessed the word!');
                    startGame();
                }, 1000); // Delay before showing the Congratulations message
            } else if (attemptsLeft === 0) {
                setTimeout(() => {
                    alert(`Sorry, you ran out of attempts. The word was: ${selectedWord}`);
                    startGame();
                }, 0);
            }
        } else {
            alert(`You already guessed the letter "${guess}"`);
        }

        letterInputElement.value = '';
        letterInputElement.focus();
    }
}

startGame();
