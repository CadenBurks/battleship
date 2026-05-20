import { BOARD_SIZE } from "./models/gameboard";

const ships = [
  { name: "carrier", length: 5 },
  { name: "battleship", length: 4 },
  { name: "destroyer", length: 3 },
  { name: "submarine", length: 3 },
  { name: "patrol", length: 2 },
];
const board = document.querySelector(".board");
const shipContainer = document.querySelector(".ship-container");

for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
  const cell = document.createElement("div");
  board.appendChild(cell);
}

ships.forEach((ship) => {
  const shipDiv = document.createElement("div");
  shipDiv.classList.add("ship");

  for (let i = 0; i < ship.length; i++) {
    const grid = document.createElement("div");
    shipDiv.appendChild(grid);
  }

  shipContainer.appendChild(shipDiv);
});
