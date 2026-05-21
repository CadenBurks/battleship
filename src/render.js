import { BOARD_SIZE, MISS, HIT, SHIP } from "./models/gameboard";

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

    for (let i = 0; i < ship.size; i++) {
      const grid = document.createElement("div");
      shipDiv.appendChild(grid);
    }

    shipContainer.appendChild(shipDiv);
  });
}

export function renderGameBoard(boardElement, gameBoard, isComputer) {
  boardElement.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("placed", "hit", "miss");
  });

  gameBoard.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.value !== null) {
        console.log(
          rowIndex,
          colIndex,
          cell.value,
          typeof cell.value,
          SHIP,
          HIT,
          MISS,
        );
      }
      const cellEl = boardElement.querySelector(
        `[data-row="${rowIndex}"][data-col="${colIndex}"]`,
      );
      if (cell.value === SHIP && !isComputer) cellEl.classList.add("placed");
      if (cell.value === HIT) cellEl.classList.add("hit");
      if (cell.value === MISS) cellEl.classList.add("miss");
    });
  });
}
