// Sample questions and answers
const questions = [
    { id: "q1", text: "15 x 15", correct: "225", choices: ["225", "125", "265", "165"] },
    { id: "q2", text: "25 x 25", correct: "625", choices: ["525", "625", "685", "575"] },
    { id: "q3", text: "35 x 35", correct: "1225", choices: ["385", "1825", "1225", "825"] },
    { id: "q4", text: "45 x 45", correct: "2025", choices: ["925", "1625", "2525", "2025"] },
    { id: "q5", text: "55 x 55", correct: "3025", choices: ["3025", "3125", "3425", "3225"] },
    { id: "q6", text: "65 x 65", correct: "4225", choices: ["4025", "4225", "4625", "4825"] },
    { id: "q7", text: "75 x 75", correct: "5625", choices: ["6125", "5825", "5625", "5725"] },
    { id: "q8", text: "85 x 85", correct: "7225", choices: ["7575", "7725", "6225", "7225"] },
    { id: "q9", text: "95 x 95", correct: "9025", choices: ["9025", "9925", "9525", "9075"] },
    { id: "q10", text: "995 x 995", correct: "990025", choices: ["99025", "990025", "90025", "900025"] },
    { id: "q11", text: "11 x 11", correct: "121", choices: ["221", "111", "121", "211"] },
    { id: "q12", text: "21 x 21", correct: "441", choices: ["541", "641", "841", "441"] },
    { id: "q13", text: "31 x 31", correct: "961", choices: ["961", "861", "341", "441"] },
    { id: "q14", text: "41 x 41", correct: "1681", choices: ["1561", "1681", "1861", "1661"] },
    { id: "q15", text: "12 x 12", correct: "144", choices: ["144", "164", "184", "154"] },
    { id: "q16", text: "22 x 22", correct: "484", choices: ["524", "464", "424", "484"] },
    { id: "q17", text: "20 x 20", correct: "400", choices: ["400", "600", "200", "800"] },
    { id: "q18", text: "30 x 30", correct: "900", choices: ["600", "900", "300", "1200"] },
    { id: "q19", text: "40 x 40", correct: "1600", choices: ["1400", "800", "1600", "1200"] },
    { id: "q20", text: "50 x 50", correct: "2500", choices: ["25000", "2250", "2000", "2500"] },
    { id: "q21", text: "60 x 60", correct: "3600", choices: ["3600", "1200", "36000", "30600"] },
    { id: "q22", text: "70 x 70", correct: "4900", choices: ["1400", "4900", "49000", "4090"] },
    { id: "q23", text: "80 x 80", correct: "6400", choices: ["1600", "800", "6400", "5400"] },
    { id: "q24", text: "90 x 90", correct: "8100", choices: ["1800", "10100", "9100", "8100"] },
    { id: "q25", text: "100 x 100", correct: "10000", choices: ["10000", "1000", "11000", "10100"] }
];

// Function to get a new question
function getNewQuestion() {
    // Filter out questions that have already been used
    let availableQuestions = questions.filter(question => !usedQuestions.includes(question.id));

    if (availableQuestions.length === 0) {
        // If all questions have been used, end the game
        stopCountdown();
        showElement("gameOver");
        document.querySelector("#gameOver").innerHTML = "<p>No more questions!</p><p>Your final score is : " + gameState.score + ".</p>";
        hideElement("timeremaining");
        hideElement("correct");
        hideElement("wrong");
        gameState.playing = false;
        document.querySelector("#startreset").innerHTML = "Start Game";
        return null;
    }

    // Randomly select a question from availableQuestions
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}
