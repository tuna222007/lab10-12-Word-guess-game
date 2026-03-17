//select element from the page
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".play-again");
//initialize game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

//function to reset game
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
    //create the empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    //enable keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //hide the game modal
    gameModal.classList.remove("show");
}
//function to get a random word and set up the game
const getRandomWord = () => {
    //pick a random word from the word array
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    //set the current word and hint
    currentWord = word;
    document.querySelector(".hint-text b").innerHTML = hint;
    //call reset game
    resetGame();
}
//function to handle the end of the game
const gameOver = (isVistory) => {
    //show the game over modal win or lose
    const modalText = isVistory ? 'You found the word:' : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVistory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVistory ? 'Congrats!' : 'Game over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}
//creating a for loop to display the keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    //adding a click listener
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
//something to handle the game logic(maybe a big problem), maybe when the letter is click

//starting the game with a random word
getRandomWord();




