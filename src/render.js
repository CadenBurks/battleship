import { BOARD_SIZE } from "./models/gameboard";

export function renderBoard(board) {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
    }
  }
}

export function renderShipOptions(shipContainer, ships) {
  ships.forEach((ship) => {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add("ship");
    shipDiv.dataset.name = ship.name;

    for (let i = 0; i < ship.length; i++) {
      const grid = document.createElement("div");
      shipDiv.appendChild(grid);
    }

    shipContainer.appendChild(shipDiv);
  });
}
