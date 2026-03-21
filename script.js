//select element from the page
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".play-again");
const secondaryActionBtn = gameModal.querySelector(".secondary-action");
const inGameBackBtn = document.querySelector(".in-game-back-btn");
const startScreen = document.querySelector(".start-screen");
const playBtn = document.querySelector(".play-btn");
const previewBtn = document.querySelector(".preview-btn");
const backBtn = document.querySelector(".back-btn");
const categorySelector = document.querySelector(".category-selector");
const categoryButtons = document.querySelectorAll(".category-btn");
const modeSelector = document.querySelector(".mode-selector");
const modeButtons = document.querySelectorAll(".mode-btn");
const previewPanel = document.querySelector(".preview-panel");
const previewImage = document.querySelector(".preview-image");
const previewWord = document.querySelector(".preview-word");
const previewPrevBtn = document.querySelector(".preview-prev");
const previewNextBtn = document.querySelector(".preview-next");
const gameContainer = document.querySelector(".container");
const modeText = document.querySelector(".mode-text b");
const hintBtn = document.querySelector(".hint-btn");
const hintCount = document.querySelector(".hint-count");
const energyText = document.querySelector(".energy-text b");
const energyBar = document.querySelector(".energy-bar");
const energyFill = document.querySelector(".energy-fill");
//initialize game variables
let currentWord, correctLetters;
const specialWordChance = 0.01;//1% chance of getting this easter egg word
const maxEnergy = 100;
const targetSolvedWords = 10;
let energyLossPerWrongGuess = 10;
let currentEnergy = maxEnergy;
let selectedMode = null;
let selectedCategory = null;
let nextAction = "next-word";
let nextSecondaryAction = null;
let solvedWordsInRun = 0;
let previewWordIndex = 0;
let hintsRemaining = 0;
const usedWordsBySession = new Map();
const usedSpecialWords = new Set();

const gameModes = {
    easy: {
        label: "Easy",
        energyLoss: 10,
        hints: 1,
        isMatch: (word) => word.length < 5,
    },
    medium: {
        label: "Medium",
        energyLoss: 20,
        hints: 2,
        isMatch: (word) => word.length >= 5 && word.length <= 7,
    },
    hard: {
        label: "Hard",
        energyLoss: 25,
        hints: 3,
        isMatch: (word) => word.length >= 8,
    },
};

const updateHintUI = () => {
    hintCount.innerText = String(hintsRemaining);
    hintBtn.disabled = hintsRemaining <= 0 || !currentWord;
}

const revealLetterAtIndex = (index) => {
    const slots = wordDisplay.querySelectorAll("li");
    const targetSlot = slots[index];
    if (!targetSlot || targetSlot.classList.contains("guessed")) return false;

    targetSlot.innerText = currentWord[index];
    targetSlot.classList.add("guessed");
    correctLetters.push(currentWord[index]);
    return true;
}

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

const getSessionKey = () => `${selectedCategory || "all"}|${selectedMode || "none"}`;

const getPreviewWords = () => wordList.filter(item => item.category !== "special");

const updatePreviewUI = () => {
    const previewWords = getPreviewWords();
    if (previewWords.length === 0) {
        previewWord.innerText = "No words available";
        previewImage.src = "images/mystery.png";
        previewPrevBtn.disabled = true;
        previewNextBtn.disabled = true;
        return;
    }

    previewWordIndex = (previewWordIndex + previewWords.length) % previewWords.length;
    const currentPreview = previewWords[previewWordIndex];
    previewWord.innerText = currentPreview.word;
    previewImage.src = `images/${currentPreview.word}-reveal.png`;
    previewImage.onerror = () => {
        previewImage.onerror = null;
        previewImage.src = "images/mystery.png";
    };
    previewPrevBtn.disabled = false;
    previewNextBtn.disabled = false;
}

const getUsedWordsForCurrentSession = () => {
    const key = getSessionKey();
    if (!usedWordsBySession.has(key)) {
        usedWordsBySession.set(key, new Set());
    }
    return usedWordsBySession.get(key);
}

const resetCurrentSessionProgress = () => {
    usedWordsBySession.set(getSessionKey(), new Set());
    usedSpecialWords.clear();
}

const setModalActions = (primaryLabel, primaryAction, secondaryLabel = null, secondaryAction = null) => {
    playAgainBtn.innerText = primaryLabel;
    nextAction = primaryAction;

    if (secondaryLabel && secondaryAction) {
        secondaryActionBtn.innerText = secondaryLabel;
        nextSecondaryAction = secondaryAction;
        secondaryActionBtn.classList.remove("hidden");
        return;
    }

    nextSecondaryAction = null;
    secondaryActionBtn.classList.add("hidden");
}

const backToMainMenu = () => {
    selectedMode = null;
    selectedCategory = null;
    solvedWordsInRun = 0;
    currentEnergy = maxEnergy;
    hintsRemaining = 0;
    updateHintUI();
    updateEnergyUI();
    gameModal.classList.remove("show");
    gameContainer.classList.add("hidden");
    startScreen.classList.remove("hidden");
    previewPanel.classList.add("hidden");
    categorySelector.classList.add("hidden");
    modeSelector.classList.add("hidden");
    playBtn.classList.remove("hidden");
    previewBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");
}

const backToModeSelection = () => {
    selectedMode = null;
    solvedWordsInRun = 0;
    currentEnergy = maxEnergy;
    hintsRemaining = 0;
    updateHintUI();
    updateEnergyUI();
    gameModal.classList.remove("show");
    gameContainer.classList.add("hidden");
    startScreen.classList.remove("hidden");
    previewPanel.classList.add("hidden");
    categorySelector.classList.add("hidden");
    modeSelector.classList.remove("hidden");
    playBtn.classList.add("hidden");
    previewBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
}

//finish 10 words = victory
const showTenWordsVictory = () => {
    const revealImage = gameModal.querySelector("img");
    revealImage.src = "images/all-clear.png";
    revealImage.onerror = () => {
        revealImage.onerror = null;
        revealImage.src = "images/mystery.png";
    };
    gameModal.querySelector("h4").innerText = "Ultimate Victory!";
    gameModal.querySelector("p").innerHTML = `You solved all the words.`;
    setModalActions("Back to menu", "main-menu", "Choose another mode", "mode-selection");
    gameModal.classList.add("show");
}

//function to reset game
const resetGame = () => {
    correctLetters = [];
    hangmanImage.src = "images/mystery.png";
    updateHintUI();
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
    const usedRegularWords = getUsedWordsForCurrentSession();
    const availableRegularWords = regularWords.filter(item => !usedRegularWords.has(item.word));

    if (availableRegularWords.length === 0) {
        showAllWordsCompleted();
        return;
    }

    const availableSpecialWords = specialWords.filter(item => !usedSpecialWords.has(item.word));
    const shouldUseSpecial = availableSpecialWords.length > 0 && Math.random() < specialWordChance;
    const sourceWords = shouldUseSpecial ? availableSpecialWords : availableRegularWords;

    //pick a random word from selected pool
    const { word, hint } = sourceWords[Math.floor(Math.random() * sourceWords.length)];

    if (shouldUseSpecial) {
        usedSpecialWords.add(word);
    } else {
        usedRegularWords.add(word);
    }

    //set the current word and hint
    currentWord = word;
    document.querySelector(".hint-text b").innerHTML = hint;
    //call reset game
    resetGame();
}
//function to handle the end of the game
const gameOver = (isVistory) => {
    //show the game over modal win or lose
    if (isVistory) {
        solvedWordsInRun++;
        if (solvedWordsInRun >= targetSolvedWords) {
            showTenWordsVictory();
            return;
        }
    }
    const modalText = isVistory ? 'You found the word:' : 'The correct word was:';
    if (!isVistory) {
        hintsRemaining = selectedMode && gameModes[selectedMode] ? gameModes[selectedMode].hints : 0;
        updateHintUI();
    }
    const revealImage = gameModal.querySelector("img");
    revealImage.src = `images/${currentWord}-reveal.png`;
    revealImage.onerror = () => {
        revealImage.onerror = null;
        revealImage.src = "images/mystery.png";
    };
    gameModal.querySelector("h4").innerText = isVistory ? 'Congrats!' : 'Game over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    if (isVistory) {
        setModalActions("Go to next word", "next-word");
    } else {
        setModalActions("Play again", "mode-selection");
    }
    gameModal.classList.add("show");
}

const startGameWithMode = (mode) => {
    if (!gameModes[mode]) return;
    selectedMode = mode;
    solvedWordsInRun = 0;
    resetCurrentSessionProgress();
    energyLossPerWrongGuess = gameModes[mode].energyLoss;
    hintsRemaining = gameModes[mode].hints;
    updateHintUI();
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
                revealLetterAtIndex(index);
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

hintBtn.addEventListener("click", () => {
    if (!currentWord || hintsRemaining <= 0) return;

    const hiddenIndexes = [...currentWord]
        .map((_, index) => index)
        .filter((index) => !wordDisplay.querySelectorAll("li")[index].classList.contains("guessed"));

    if (hiddenIndexes.length === 0) {
        hintBtn.disabled = true;
        return;
    }

    const randomIndex = hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];
    const isRevealed = revealLetterAtIndex(randomIndex);
    if (!isRevealed) return;

    hintsRemaining = Math.max(0, hintsRemaining - 1);
    updateHintUI();

    if (correctLetters.length === currentWord.length) {
        gameOver(true);
    }
});
//starting UI and game flow
updateEnergyUI();
playBtn.addEventListener("click", () => {
    previewPanel.classList.add("hidden");
    categorySelector.classList.remove("hidden");
    modeSelector.classList.add("hidden");
    playBtn.classList.add("hidden");
    previewBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
});

previewBtn.addEventListener("click", () => {
    previewWordIndex = 0;
    updatePreviewUI();
    previewPanel.classList.remove("hidden");
    categorySelector.classList.add("hidden");
    modeSelector.classList.add("hidden");
    playBtn.classList.add("hidden");
    previewBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
});

previewPrevBtn.addEventListener("click", () => {
    previewWordIndex--;
    updatePreviewUI();
});

previewNextBtn.addEventListener("click", () => {
    previewWordIndex++;
    updatePreviewUI();
});

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        categorySelector.classList.add("hidden");
        modeSelector.classList.remove("hidden");
        backBtn.classList.remove("hidden");
    });
});

backBtn.addEventListener("click", () => {
    if (!previewPanel.classList.contains("hidden")) {
        previewPanel.classList.add("hidden");
        playBtn.classList.remove("hidden");
        previewBtn.classList.remove("hidden");
        backBtn.classList.add("hidden");
        return;
    }

    if (!modeSelector.classList.contains("hidden")) {
        modeSelector.classList.add("hidden");
        categorySelector.classList.remove("hidden");
        return;
    }

    if (!categorySelector.classList.contains("hidden")) {
        categorySelector.classList.add("hidden");
        playBtn.classList.remove("hidden");
        previewBtn.classList.remove("hidden");
        backBtn.classList.add("hidden");
    }
});

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        startGameWithMode(button.dataset.mode);
    });
});


//add event listerner for the play again button
playAgainBtn.addEventListener("click", () => {
    if (nextAction === "main-menu") {
        backToMainMenu();
        return;
    }
    if (nextAction === "mode-selection") {
        backToModeSelection();
        return;
    }
    if (!selectedMode) return;
    getRandomWord();
});

secondaryActionBtn.addEventListener("click", () => {
    if (nextSecondaryAction === "mode-selection") {
        backToModeSelection();
    }
});

inGameBackBtn.addEventListener("click", () => {
    backToModeSelection();
});


