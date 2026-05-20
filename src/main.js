import { BOARD_SIZE } from "./models/gameboard";
import { Ship } from "./models/ship";
import { Player } from "./models/player";
import { renderBoard, renderGameBoard, renderShipOptions } from "./render";
import { initPlacement } from "./placement";

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

renderBoard(board);
renderShipOptions(shipContainer, ships);
initPlacement(ships, board);

function randomComputerShips(player) {
  ships.forEach((shipData) => {
    const ship = Ship(shipData.size, Math.round(Math.random()));

    let placed = false;
    while (!placed) {
      try {
        const coord = [
          Math.floor(Math.random() * BOARD_SIZE),
          Math.floor(Math.random() * BOARD_SIZE),
        ];
        player.board.placeShip(ship, coord);
        placed = true;
      } catch {
        // invalid
      }
    }
  });
}

startBtn.addEventListener("click", () => {
  console.log("START clicked");
  const player = Player();
  const playerShips = ships.map((ship) => [
    Ship(ship.size, ship.vertical),
    ship.coord,
  ]);
  playerShips.forEach((ship, i) => {
    player.board.placeShip(ship[0], ship[1]);
  });

  const computer = Player(true);
  randomComputerShips(computer);

  const playerDiv = document.querySelector(".player");
  playerDiv.classList.add("hidden");
  shipContainer.classList.add("hidden");
  startBtn.classList.add("hidden");

  const game = document.querySelector(".game");
  game.classList.remove("hidden");

  const playerBoard = document.querySelector(".player-board");
  const computerBoard = document.querySelector(".computer-board");
  renderBoard(playerBoard);
  renderGameBoard(playerBoard, player.board);
  renderBoard(computerBoard);
});
