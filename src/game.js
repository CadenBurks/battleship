import { Ship } from "./models/ship";
import { Player } from "./models/player";
import { BOARD_SIZE } from "./models/gameboard";

function randomComputerShips(player, ships) {
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

export function startGame(startShips) {
  const player = Player();
  const playerShips = startShips.map((ship) => [
    Ship(ship.size, ship.vertical),
    ship.coord,
  ]);
  playerShips.forEach((ship, i) => {
    player.board.placeShip(ship[0], ship[1]);
  });

  const computer = Player(true);
  randomComputerShips(computer, startShips);

  return [player, computer];
}

export function waitForAttack(board) {
  return new Promise((resolve) => {
    function handleClick(e) {
      const cell = e.target;
      if (!cell.classList.contains("cell")) return;
      if (cell.classList.contains("hit") || cell.classList.contains("miss"))
        return;
      const coord = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
      board.removeEventListener("click", handleClick);
      resolve(coord);
    }
    board.addEventListener("click", handleClick);
  });
}
