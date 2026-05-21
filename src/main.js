import { renderBoard, renderGameBoard, renderShipOptions } from "./render";
import { initPlacement } from "./placement";
import { startGame, waitForAttack } from "./game";

const ships = [
  { name: "carrier", size: 5, placed: false, coord: null, vertical: false },
  {
    name: "battleship",
    size: 4,
    placed: false,
    coord: null,
    vertical: false,
  },
  { name: "destroyer", size: 3, placed: false, coord: null, vertical: false },
  { name: "submarine", size: 3, placed: false, coord: null, vertical: false },
  { name: "patrol", size: 2, placed: false, coord: null, vertical: false },
];

const board = document.querySelector(".board");
const shipContainer = document.querySelector(".ship-container");
const startBtn = document.querySelector(".start");
const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");
const playerDiv = document.querySelector(".player");
const restartBtn = document.querySelector(".restart");

renderBoard(board);
renderShipOptions(shipContainer, ships);
initPlacement(ships, board);

async function gameLoop(player, computer) {
  while (!player.board.allSunk() && !computer.board.allSunk()) {
    const coord = await waitForAttack(computerBoard);
    computer.board.receiveAttack(coord);
    renderGameBoard(computerBoard, computer.board, true);
    computer.attack(player.board);
    renderGameBoard(playerBoard, player.board);
  }
  const message = computer.board.allSunk() ? "Player Wins!" : "Computer Wins!";
  alert(message);
  restartBtn.classList.remove("hidden");
}

startBtn.addEventListener("click", () => {
  console.log("START clicked");
  const [player, computer] = startGame(ships);

  playerDiv.classList.add("hidden");
  shipContainer.classList.add("hidden");
  startBtn.classList.add("hidden");

  const game = document.querySelector(".game");
  game.classList.remove("hidden");

  renderBoard(playerBoard);
  renderGameBoard(playerBoard, player.board);
  renderBoard(computerBoard);
  renderGameBoard(computerBoard, computer.board, true);

  gameLoop(player, computer);
});

restartBtn.addEventListener("click", () => {
  location.reload();
});
