const buttons = document.querySelectorAll(".button");
const gameboard = document.getElementById("gameboard");
const pcWinScore = document.getElementById("pcWinScore");
const playerWinScore = document.getElementById("playerWinScore");
const pсSign = document.getElementById("pсSign");
const playerSign = document.getElementById("playerSign");
const restartBtn = document.getElementById("restart-btn");
const whoWinGame = document.getElementById("who-win-game");
const modal = document.getElementById("win-game-messedge");
const roundResultText = document.getElementById("gameboard-score-message-text");

const FIGURE_ARRAY = ["rock", "paper", "scissors"];
const SIGN_ARRAY = ["✊", "✋", "✌"];
const WIN_ARRAY = ["👑YOU WIN👑", "💔YOU LOSE💔"];
const gameScore = { plrWns: 0, pcWns: 0 };

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", buttonClickHandler);
}

restartBtn.addEventListener("click", () => {
  modal.style.display = "none";
  game();
});

function signChoice(elem, num) {
  elem.textContent = SIGN_ARRAY[num];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max - 1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showModal(gameResult) {
  gameboard.classList.add("opacity0");
  setTimeout(() => {
    gameboard.style.display = "none";
    modal.style.display = "block";
  }, 200);
  whoWinGame.textContent = gameResult;
}

function computerPlay(arr, num) {
  signChoice(pсSign, num);
  return arr[num];
}

function buttonClickHandler(e) {
  let playerSelection = e.target.dataset.value;

  signChoice(playerSign, FIGURE_ARRAY.indexOf(playerSelection));
  let computerSelection = computerPlay(
    FIGURE_ARRAY,
    getRandomInt(0, FIGURE_ARRAY.length)
  );
  let roundResult = playRound(playerSelection, computerSelection, gameScore);
  updateScore(gameScore, roundResult);
}

function updateScore(scoreData, roundResult) {
  roundResultText.textContent = roundResult;
  playerWinScore.textContent = scoreData.plrWns;
  pcWinScore.textContent = scoreData.pcWns;
  if (scoreData.pcWns === 5) {
    return showModal(WIN_ARRAY[1]);
  }
  if (scoreData.plrWns === 5) {
    return showModal(WIN_ARRAY[0]);
  }
}

function playRound(playerSelection, computerSelection, scoreData) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    scoreData.plrWns += 1;
    return "Player Win, Paper wraps Rock";
  } else if (playerSelection === "paper" && computerSelection === "scissors") {
    scoreData.pcWns++;
    return "PC Win, Scissors cuts Paper";
  } else if (playerSelection === "rock" && computerSelection === "scissors") {
    scoreData.plrWns++;
    return "Player Win, Rock beats Scissors";
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    scoreData.pcWns++;
    return "PC Win, Paper wraps Rock";
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    scoreData.plrWns++;
    return "Player Win, Scissors cuts Paper";
  } else if (playerSelection === "scissors" && computerSelection === "rock") {
    scoreData.pcWns++;
    return "PC Win, Rock beats Scissors";
  }
  return "ERROR";
}

function game() {
  gameboard.classList.remove("opacity0");
  gameboard.style.display = "flex";
  roundResultText.textContent = "Start the round";
  playerWinScore.textContent = "0";
  pcWinScore.textContent = "0";
  gameScore.pcWns = 0;
  gameScore.plrWns = 0;
}

game();
