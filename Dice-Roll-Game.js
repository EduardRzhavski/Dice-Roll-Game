let scores, currentRollScore, activePlayer, gamePlaying, winningScore;
const winningScoreInput = document.getElementById('winning-score');
const rollButton = document.getElementById('roll');
const holdButton = document.getElementById('hold');
const newGameButton = document.getElementById('new-game');
const message = document.getElementById('message');
const currentRollDisplay = document.getElementById('current-roll');
const diceImages = [
    "dice1.png",
    "dice2.png",
    "dice3.png",
    "dice4.png",
    "dice5.png",
    "dice6.png"
];
const diceElements = document.querySelectorAll('.dice');
const scoreDisplay1 = document.getElementById('score1');
const scoreDisplay2 = document.getElementById('score2');
const displayWinningScore = document.getElementById('display-winning-score');

function init() {
    scores = [0, 0];
    currentRollScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    winningScore = parseInt(winningScoreInput.value);
    diceElements[0].src = "dice1.png";
    diceElements[1].src = "dice1.png";
    updateScores();
    displayWinningScore.textContent = winningScore; 
    message.textContent = 'Player 1\'s Turn';
}

function rollDice() {
    if (gamePlaying) {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;

        diceElements[0].src = diceImages[die1 - 1];
        diceElements[1].src = diceImages[die2 - 1];

        const total = die1 + die2;

        if (die1 === 6 && die2 === 6) {
            scores[activePlayer] = 0;
            currentRollScore = 0;
            updateScores();
            message.textContent = `Player ${activePlayer + 1} rolled a double six and lost their score.`;
            setTimeout(nextPlayer, 1000);
        } else if (die1 !== 1 && die2 !== 1) {
            currentRollScore += total;
            updateScores();
            document.getElementById(`score${activePlayer + 1}`).innerHTML = `Current Score: ${currentRollScore}<br>Total Score: ${scores[activePlayer]}`;
            message.textContent = `Current Roll: ${currentRollScore}`;
        } else {
            message.textContent = `Player ${activePlayer + 1} rolled a one. Switching turn.`;
            setTimeout(nextPlayer, 1000);
        }

        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            message.textContent = `Player ${activePlayer + 1} wins!`;
            diceElements[0].src = "";
            diceElements[1].src = "";
            updateScores();
        }
    }
}

function hold() {
    if (gamePlaying) {
        scores[activePlayer] += currentRollScore;
        currentRollScore = 0;
        updateScores();
        
        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            message.textContent = `Player ${activePlayer} wins!`;
            diceElements[0].src = "";
            diceElements[1].src = "";
            updateScores();
        } else {
            message.textContent = `Player ${activePlayer + 1} holds.`;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            setTimeout(() => {
                message.textContent = `Player ${activePlayer + 1}'s Turn`;
                diceElements[0].src = "dice1.png";
                diceElements[1].src = "dice1.png";
                currentRollScore = 0;
                updateScores();
            }, 1000);
        }
    }
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentRollScore = 0;
    message.textContent = `Player ${activePlayer + 1}'s Turn`;
    diceElements[0].src = "dice1.png";
    diceElements[1].src = "dice1.png";
    updateScores();
}

function updateScores() {
    if (activePlayer === 0) {
        scoreDisplay1.innerHTML = `Current Score: ${currentRollScore}<br>Total Score: ${scores[0]}`;
        scoreDisplay2.innerHTML = `Current Score: 0<br>Total Score: ${scores[1]}`;
    } else {
        scoreDisplay1.innerHTML = `Current Score: 0<br>Total Score: ${scores[0]}`;
        scoreDisplay2.innerHTML = `Current Score: ${currentRollScore}<br>Total Score: ${scores[1]}`;
    }
}

init();

newGameButton.addEventListener('click', init);
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', hold);
winningScoreInput.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    displayWinningScore.textContent = this.value; 
});