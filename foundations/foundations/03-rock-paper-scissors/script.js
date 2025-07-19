let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function getHumanChoice() {
  let userInput = prompt(`Please choose one of the following: "rock", "paper", or "scissors"`);

  if (!userInput) return null;

  userInput = userInput.toLowerCase();

  if (["rock", "paper", "scissors"].includes(userInput)) {
    return userInput;
  } else {
    return null;
  }
}

function playRound() {
  const humanChoice = getHumanChoice();
  const computerChoice = getComputerChoice();

  if (!humanChoice) {
    console.log("Invalid input. Round cancelled.");
    return;
  }

  console.log(`You chose ${humanChoice}, computer chose ${computerChoice}`);

  if (humanChoice === computerChoice) {
    console.log("It's a tie!");
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
  } else {
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
  }

  console.log(`Score — Human: ${humanScore}, Computer: ${computerScore}`);
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    playRound();
  }

  console.log("Final Result:");
  if (humanScore > computerScore) {
    console.log("You win the game!");
  } else if (humanScore < computerScore) {
    console.log("Computer wins the game!");
  } else {
    console.log("The game is a tie!");
  }
}

playGame();
