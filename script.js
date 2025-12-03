const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const xScoreText = document.getElementById("x-score");
const oScoreText = document.getElementById("o-score");

// ✅ Sound files (make sure these files exist in your folder)
const xSound = new Audio("x sound.mp3");
const oSound = new Audio("o soundy.mp3");

// GIF elements
const fireworkGifContainer = document.getElementById("firework-gif-container");
const duckGifContainer = document.getElementById("duck-gif-container");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let xScore = 0;
let oScore = 0;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function showGif(gifElement) {
  gifElement.style.display = "block";
  setTimeout(() => {
    gifElement.style.display = "none";
  }, 3000); // Hide GIF after 3 seconds
}

function hideAllGifs() {
  fireworkGifContainer.style.display = "none";
  duckGifContainer.style.display = "none";
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // ✅ Remove previous color class (if any)
  e.target.classList.remove("x", "o");

  // ✅ Add color class according to currentPlayer
  e.target.classList.add(currentPlayer.toLowerCase());

  // ✅ Play sound
  if (currentPlayer === "X") {
    xSound.play();
  } else {
    oSound.play();
  }

  // ✅ Check winner
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    updateScore(currentPlayer);
    showGif(fireworkGifContainer); // Show firework GIF
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Draw!";
    isGameActive = false;
    showGif(duckGifContainer); // Show duck GIF
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function updateScore(winner) {
  if (winner === "X") {
    xScore++;
    xScoreText.textContent = xScore;
  } else {
    oScore++;
    oScoreText.textContent = oScore;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o"); // Remove color class
  });
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  isGameActive = true;
  hideAllGifs(); // Hide any visible GIFs on reset
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);