const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const resetScoreboardButton = document.getElementById('reset-scoreboard');
const xWinsText = document.getElementById('x-wins');
const oWinsText = document.getElementById('o-wins');
const drawsText = document.getElementById('draws');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = 0;
let oWins = 0;
let draws = 0;

// This code Implements a Tic-Tac-Toe. The first player selects a box which fills X and the second player selects a box that fills O. 
//This goes on until there is a winning condition by either player, The scoreboard is updated dynamically.
//There are buttons present to reset the game and scoreboard.

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],// Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],// Columns
    [0, 4, 8], [2, 4, 6]// Diagonals
    // If there a pattern of either X's or O's matching this pattern then it is a win.
];

// Update status message
function updateStatus() {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win or draw
function checkResult() {
    let roundWon = false;

    // Check all winning conditions
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    // Handle win
    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        currentPlayer === 'X' ? xWins++ : oWins++;
        updateScoreboard();
        return;
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        statusText.textContent = 'It\'s a draw!';
        gameActive = false;
        draws++;
        updateScoreboard();
        return;
    }

    // Continue game
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    // Check if the cell is already occupied or game is not active
    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    // Mark the cell
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check the result
    checkResult();
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    updateStatus();
}

// Update the scoreboard
function updateScoreboard() {
    xWinsText.textContent = xWins;
    oWinsText.textContent = oWins;
    drawsText.textContent = draws;
}

// Reset the scoreboard
function resetScoreboard() {
    xWins = 0;
    oWins = 0;
    draws = 0;
    updateScoreboard();
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
resetScoreboardButton.addEventListener('click', resetScoreboard);

// Initialize the game
updateStatus();
