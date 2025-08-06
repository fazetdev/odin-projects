// gameBoard module to hold the board array and reset functionality
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    // Clear the same board array instead of replacing it
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { board, resetBoard };
})();

// Player factory function
const Player = (name, marker) => {
  return { name, marker };
};

// Create two players
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

// GameController module with game logic and referee
const GameController = (() => {
  let currentPlayer = player1;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  };

  const resetGame = () => {
    currentPlayer = player1;
    gameOver = false;
  };

  const checkWinner = () => {
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        gameBoard.board[a] &&
        gameBoard.board[a] === gameBoard.board[b] &&
        gameBoard.board[a] === gameBoard.board[c]
      ) {
        displayController.displayResult(`${currentPlayer.name} wins!`);
        gameOver = true;
        return true;
      }
    }

    if (!gameBoard.board.includes("")) {
      displayController.displayResult("It's a tie!");
      gameOver = true;
      return true;
    }

    return false;
  };

  const playRound = (position) => {
    if (gameOver) return; // stop moves after game ends

    if (gameBoard.board[position] === "") {
      gameBoard.board[position] = currentPlayer.marker;
      displayController.renderBoard();

      if (!checkWinner()) {
        switchPlayer();
      }
    } else {
      displayController.displayResult(`The spot ${position} is already taken!`);
    }
  };

  return { playRound, resetGame };
})();

// DisplayController module to handle UI rendering and interaction
const displayController = (() => {
  const boardElement = document.getElementById('game-board');
  const resultElement = document.getElementById('game-result');
  const resetButton = document.getElementById('reset-button');

  const renderBoard = () => {
    boardElement.innerHTML = ''; // Clear board
    gameBoard.board.forEach((marker, index) => {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.index = index;
      square.textContent = marker;
      boardElement.appendChild(square);
    });
  };

  const displayResult = (message) => {
    resultElement.textContent = message;
  };

  const clearResult = () => {
    resultElement.textContent = '';
  };

  // Add click event listener for squares
  boardElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('square')) {
      const index = event.target.dataset.index;
      GameController.playRound(Number(index));
    }
  });

  // Add click event listener for reset button
  resetButton.addEventListener('click', () => {
    gameBoard.resetBoard();
    clearResult();
    renderBoard();
    GameController.resetGame();
  });

  return { renderBoard, displayResult, clearResult };
})();

// Initial render
displayController.renderBoard();
