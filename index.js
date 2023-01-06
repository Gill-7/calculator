function getComputerChoice() {
  const gameChoices = ["rock", "paper", "scissors"];
  let randomNum = Math.floor(Math.random() * 3);
  return gameChoices[randomNum];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
    return `It's a tie! Both players select the same option: ${playerSelection}`;
  }
  if (
    (playerSelection.toLowerCase() === "rock" &&
      computerSelection === "paper") ||
    (playerSelection.toLowerCase() === "paper" &&
      computerSelection === "scissors") ||
    (playerSelection.toLowerCase() === "scissors" &&
      computerSelection === "rock")
  ) {
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  } else {
    return `You won! ${playerSelection} beats ${computerSelection}`;
  }
}

const computerSelection = getComputerChoice();

function game() {
  const userPlayer = prompt("Choose between rock, paper, scissors");
  for (let i = 0; i < 5; i++) {
    console.log(playRound(userPlayer, computerSelection));
  }
}

game();
