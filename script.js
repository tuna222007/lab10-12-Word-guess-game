//select element from the page
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".play-again");
const startScreen = document.querySelector(".start-screen");
const playBtn = document.querySelector(".play-btn");
const categorySelector = document.querySelector(".category-selector");
const categoryButtons = document.querySelectorAll(".category-btn");
const modeSelector = document.querySelector(".mode-selector");
const modeButtons = document.querySelectorAll(".mode-btn");
const gameContainer = document.querySelector(".container");
const modeText = document.querySelector(".mode-text b");
const energyText = document.querySelector(".energy-text b");
const energyBar = document.querySelector(".energy-bar");
const energyFill = document.querySelector(".energy-fill");
//initialize game variables
let currentWord, correctLetters;
const specialWordChance = 0.05;//5% chance of getting this easter egg word
const maxEnergy = 100;
let energyLossPerWrongGuess = 10;
let currentEnergy = maxEnergy;
let selectedMode = null;
let selectedCategory = null;
let nextAction = "next-word";

const gameModes = {
    easy: {
        label: "Easy",
        energyLoss: 10,
        isMatch: (word) => word.length < 5,
    },
    medium: {
        label: "Medium",
        energyLoss: 20,
        isMatch: (word) => word.length >= 5 && word.length <= 7,
    },
    hard: {
        label: "Hard",
        energyLoss: 25,
        isMatch: (word) => word.length >= 8,
    },
};

const updateEnergyUI = () => {
    const safeEnergy = Math.max(0, Math.min(maxEnergy, currentEnergy));
    energyText.innerText = `${safeEnergy}%`;
    energyBar.setAttribute("aria-valuenow", String(safeEnergy));
    energyFill.style.width = `${safeEnergy}%`;
    energyFill.classList.toggle("medium", safeEnergy <= 60 && safeEnergy > 30);
    energyFill.classList.toggle("low", safeEnergy <= 30);
}

//mode selection with 3 mode words if it fulfill the condition which is at line 28
const getWordsForMode = (words) => {
    if (!selectedMode || !gameModes[selectedMode]) return words;
    const filteredWords = words.filter(item => gameModes[selectedMode].isMatch(item.word));
    return filteredWords.length > 0 ? filteredWords : words;
}

//choosing words from category in word-list.js
const getWordsForCategory = (words) => {
    if (!selectedCategory) return words;
    const filteredWords = words.filter(item => item.category === selectedCategory);
    return filteredWords.length > 0 ? filteredWords : words;
}

const backToModeSelection = () => {
    selectedMode = null;
    currentEnergy = maxEnergy;
    updateEnergyUI();
    gameModal.classList.remove("show");
    gameContainer.classList.add("hidden");
    startScreen.classList.remove("hidden");
    categorySelector.classList.add("hidden");
    modeSelector.classList.remove("hidden");
    playBtn.classList.add("hidden");
}

//function to reset game
const resetGame = () => {
    correctLetters = [];
    hangmanImage.src = "images/mystery.png";
    //create the empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    //enable keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //hide the game modal
    gameModal.classList.remove("show");
}
//function to get a random word and set up the game
const getRandomWord = () => {
    const specialWords = wordList.filter(item => item.category === "special");
    const regularWords = getWordsForMode(
        getWordsForCategory(wordList.filter(item => item.category !== "special"))
    );
    const shouldUseSpecial = specialWords.length > 0 && Math.random() < specialWordChance;
    const sourceWords = shouldUseSpecial ? specialWords : regularWords;
    const fallbackWords = sourceWords.length > 0 ? sourceWords : wordList;

    //pick a random word from selected pool
    const { word, hint } = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
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
    const revealImage = gameModal.querySelector("img");
    revealImage.src = `images/${currentWord}-reveal.png`;
    revealImage.onerror = () => {
        revealImage.onerror = null;
        revealImage.src = "images/mystery.png";
    };
    gameModal.querySelector("h4").innerText = isVistory ? 'Congrats!' : 'Game over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    nextAction = isVistory ? "next-word" : "mode-selection";
    playAgainBtn.innerText = isVistory ? "Go to next word" : "Play again";
    gameModal.classList.add("show");
}

const startGameWithMode = (mode) => {
    if (!gameModes[mode]) return;
    selectedMode = mode;
    energyLossPerWrongGuess = gameModes[mode].energyLoss;
    modeText.innerText = `${gameModes[mode].label} (-${energyLossPerWrongGuess} energy/wrong guess)`;
    startScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    getRandomWord();
}
//creating a for loop to display the keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    //adding a click listener
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
//something to handle the game logic(maybe a big problem), maybe when the letter is clicked
const initGame =(button,clickedLetter)=>{
    //check if the clicked letter is in the current word
    if (currentWord.includes(clickedLetter)) {
        //display letter if the clicked letter is correct
        [...currentWord].forEach((letter,index)=>{
            if (letter===clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else{
        //reduce energy when the letter is incorrect
        currentEnergy = Math.max(0, currentEnergy - energyLossPerWrongGuess);
        updateEnergyUI();
    }
    //disable the clicked button->it can be clicked only once
    button.disabled= true;
    //check if the game should end base on win or lose conditions
    if (currentEnergy === 0) return gameOver(false);
    if (correctLetters.length ===currentWord.length) return gameOver(true);
}
//starting UI and game flow
updateEnergyUI();
playBtn.addEventListener("click", () => {
    categorySelector.classList.remove("hidden");
    modeSelector.classList.add("hidden");
    playBtn.classList.add("hidden");
});

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        categorySelector.classList.add("hidden");
        modeSelector.classList.remove("hidden");
    });
});

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        startGameWithMode(button.dataset.mode);
    });
});


//add event listerner for the play again button
playAgainBtn.addEventListener("click", () => {
    if (nextAction === "mode-selection") {
        backToModeSelection();
        return;
    }
    if (!selectedMode) return;
    getRandomWord();
});


