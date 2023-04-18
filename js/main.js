function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function computerPlay(arr, num) {
  return arr[num];
}

function createBtn(FIGURE_ARRAY) {
  const buttonsSection = document.querySelector(".buttons");
  for (i = 0; i < FIGURE_ARRAY.length; i++) {
    const newBtn = document.createElement("button");
    newBtn.classList.add("button");
    newBtn.textContent = FIGURE_ARRAY[i];
    newBtn.dataset.value = FIGURE_ARRAY[i];
    buttonsSection.appendChild(newBtn);
  }
}

function btnAddEvent(nextRound, FIGURE_ARRAY, gameScore) {
  const buttons = document.querySelectorAll(".button");
  const clickHandler = (event) => btnClick(event, FIGURE_ARRAY, gameScore);
  if (nextRound === true) {
    buttons.forEach((btn) => {
      btn.remove();
    });
    createBtn(FIGURE_ARRAY);
    game();
  } else {
    buttons.forEach((btn) => {
      btn.addEventListener("click", clickHandler);
    });
  }
}

function btnClick(e, FIGURE_ARRAY, gameScore) {
  let playerSelection = e.target.dataset.value;
  let computerSelection = computerPlay(
    FIGURE_ARRAY,
    getRandomInt(FIGURE_ARRAY.length)
  );
  let roundResult = playRound(playerSelection, computerSelection, gameScore);
  updateScore(gameScore, roundResult);
}

function updateScore(scoreData, roundResult, removeFunc) {
  const answer = document.getElementById("answer");
  const playerWinScore = document.getElementById("playerWinScore");
  const drawScore = document.getElementById("drawScore");
  const pcWinScore = document.getElementById("pcWinScore");

  answer.parentNode.style.background = "#c9a39e";
  answer.textContent = roundResult;

  playerWinScore.textContent = scoreData.plrWns;
  pcWinScore.textContent = scoreData.pcWns;
  drawScore.textContent =
    scoreData.round - (scoreData.plrWns + scoreData.pcWns);

  if (scoreData.plrWns === 5 || scoreData.pcWns === 5) {
    answer.parentNode.style.background = "green";
    if (scoreData.plrWns > scoreData.pcWns) {
      answer.textContent = "Player win";
    } else {
      answer.parentNode.style.background = "#ff543e";
      answer.textContent = "PC win";
    }

    return game(true);
  }
}

function playRound(playerSelection, computerSelection, scoreData) {
  scoreData.round += 1;

  if (playerSelection === computerSelection) {
    return "Draw";
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

function game(nextRound = false) {
  const FIGURE_ARRAY = ["rock", "paper", "scissors"];
  const gameScore = { plrWns: 0, pcWns: 0, round: 0 };
  btnAddEvent(nextRound, FIGURE_ARRAY, gameScore);
}

game();
