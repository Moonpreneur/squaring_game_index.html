
// Game state object
let gameState = {
    playing: false,
    score: 0,
    action: null,
    timeRemaining: null,
    correctAnswer: null,
    happyEmojis: ['😊', '😁', '🎉', '👍', '😄'],
    sadEmojis: ['😞', '😢', '🙁', '😭', '👎']
};

// Define a global array to track used question IDs
let usedQuestions = [];

// Start/Reset button click event handler
document.querySelector("#startreset").onclick = () => {
    if (gameState.playing) {
        // Reload the page if already playing
        location.reload();
    } else {
        // Start the game
        gameState.playing = true;
        gameState.score = 0;
        document.querySelector("#scorevalue").innerHTML = gameState.score;
        showElement("timeremaining");
        gameState.timeRemaining = 60;
        document.querySelector("#timeremainingvalue").innerHTML = gameState.timeRemaining;
        hideElement("gameOver");
        document.querySelector("#startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
};

// Answer box click event handlers
for (let i = 1; i <= 4; i++) {
    document.querySelector("#box" + i).onclick = () => {
        if (gameState.playing) {
            const selectedAnswer = document.querySelector("#box" + i).innerHTML;
            const correctAnswer = gameState.correctAnswer;
            if (selectedAnswer === correctAnswer) {
                gameState.score += 2;
                document.querySelector("#scorevalue").innerHTML = gameState.score;
                hideElement("wrong");
                showElement("correct");
                showEmoji("correct");
                document.getElementById('correctAnswerSound').play();
                setTimeout(() => {
                    hideElement("correct");
                }, 1000);
                generateQA();
            } else {
                gameState.score -= 1;
                document.querySelector("#scorevalue").innerHTML = gameState.score;
                hideElement("correct");
                showElement("wrong");
                showEmoji("wrong");
                document.getElementById('incorrectAnswerSound').play();
                setTimeout(() => {
                    hideElement("wrong");
                }, 1000);
            }
        }
    };
}

//Displays 3, 2, 1 GO!
function countdownStart() {
    let count = 5;
    countdown.textContent = count;
    const timeCountDown = setInterval(() => {
        count--;
        if (count === 0) {
            countdown.textContent = 'GO!';
        } else if (count === -1) {
            showGamePage();
            clearInterval(timeCountDown);
        } else {
            countdown.textContent = count;
        }
    }, 1000);
}

// Navigate from Splash page to Countdown Page
function showCountdown() {
    countdownPage.hidden = false;
    splashPage.hidden = true;
    populateGamePage();
    countdownStart();
}

// Countdown function
function startCountdown() {
    gameState.action = setInterval(() => {
        gameState.timeRemaining -= 1;
        document.querySelector("#timeremainingvalue").innerHTML = gameState.timeRemaining;
        if (gameState.timeRemaining === 0) {
            stopCountdown();
            showElement("gameOver");
            document.querySelector("#gameOver").innerHTML = "<p>Game Over!</p><p>Your score is : " + gameState.score + ".</p>";
            hideElement("timeremaining");
            hideElement("correct");
            hideElement("wrong");
            gameState.playing = false;
            document.querySelector("#startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

// Display Game Page
function showGamePage() {
    gamePage.hidden = false;
    countdownPage.hidden = true;
}
// Stop countdown function
function stopCountdown() {
    clearInterval(gameState.action);
}

// Utility function to hide elements
function hideElement(id) {
    document.querySelector("#" + id).style.display = "none";
}

// Utility function to show elements
function showElement(id) {
    document.querySelector("#" + id).style.display = "block";
}

// Function to show emoji based on result
function showEmoji(result) {
    const emojiElement = document.querySelector("#" + result);
    let emoji;
    if (result === "correct") {
        const shuffledHappyEmojis = shuffle(gameState.happyEmojis);
        emoji = shuffledHappyEmojis[0];
    } else if (result === "wrong") {
        const shuffledSadEmojis = shuffle(gameState.sadEmojis);
        emoji = shuffledSadEmojis[0];
    }
    emojiElement.innerHTML = '<span class="emoji">' + emoji + '</span>';
}

// Function to generate questions and answers
function generateQA() {
    const questionObj = getNewQuestion();
    if (!questionObj) return;

    const correspondingAnswer = questionObj.correct;

    // Display the question
    document.querySelector("#question").innerHTML = questionObj.text;

    // Shuffle and display answer choices
    const shuffledChoices = shuffle(questionObj.choices);
    for (let i = 1; i <= 4; i++) {
        document.querySelector("#box" + i).innerHTML = shuffledChoices[i - 1];
    }

    // Track this question as used
    usedQuestions.push(questionObj.id);

    // Update correct answer for comparison
    gameState.correctAnswer = correspondingAnswer;
}

// Utility function to shuffle an array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


















