const figureArray = ["rock", "paper", "scissors"]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function computerPlay(random){
  return computerSelection =  figureArray[random];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection){
    return ('Draw')
  }else if (playerSelection === 'paper' && computerSelection === 'rock'){
    plrWns++;
    return ("Player Win, Paper wraps Rock")
  }else if (playerSelection === 'paper' && computerSelection === 'scissors'){
    pcWns++;
    return ("PC Win, Scissors cuts Paper")
  }else if (playerSelection === 'rock' && computerSelection === 'scissors'){
    plrWns++;
    return ("Player Win, Rock beats Scissors")
  }else if (playerSelection === 'rock' && computerSelection === 'paper'){
    pcWns++;
    return ("PC Win, Paper wraps Rock")
  }else if (playerSelection === 'scissors' && computerSelection === 'paper'){
    plrWns++;
    return ("Player Win, Scissors cuts Paper")
  }else if (playerSelection === 'scissors' && computerSelection === 'rock'){
    pcWns++;
    return ("PC Win, Rock beats Scissors")
  }
  return("ERROR")
}

function game() {
  plrWns = 0;
  pcWns = 0;
  for (let i = 0; i < 5; i++) {
   playerSelection = prompt('Choose Rock, Paper, Scissors', 'Rock');
   playerSelectionCheck();
   computerSelection = computerPlay(getRandomInt(3));
   alert(playRound(playerSelection, computerSelection));
  }
  let SCORE = ("PLR = " + plrWns + ", PC = " + pcWns  + ", Draws = " + (5 - (plrWns + pcWns)));
  if(plrWns === pcWns){
      return(alert("NO WINNERS, Score: " + SCORE))
    }else if(plrWns > pcWns){
      return(alert("Player Win, Score: " + SCORE))
    }else{
      return(alert("PC Win, Score: " + SCORE ))
    }
  
}

game()



function playerSelectionCheck(){
  if ((playerSelection) == null ||((playerSelection.toLowerCase()) != "rock" && (playerSelection.toLowerCase()) != "paper" &&(playerSelection.toLowerCase()) != "scissors") ){
    playerSelection = prompt('Oops, Something went wrong!!! Choose Rock, Paper or Scissors', 'Rock');
    playerSelectionCheck();
   }else{
    playerSelection = playerSelection.toLowerCase();
   }
}