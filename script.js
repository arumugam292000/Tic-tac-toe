const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function handleClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        render();
        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWinner() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combination of winningCombination) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function render() {
    gameBoard.forEach((cell, index) => {
        const cellDiv = board.children[index];
        cellDiv.textContent = cell;
    });
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "";
    render();
}

board.addEventListener("click", (event) => {
    const cellIndex = Array.from(board.children).indexOf(event.target);
    if (cellIndex >= 0) {
        handleClick(cellIndex);
    }
});

restartBtn.addEventListener("click", restartGame);

render();
