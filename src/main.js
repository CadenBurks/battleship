import { GameBoard } from "./models/gameboard";
import { Ship } from "./models/ship";
import { Player } from "./models/player";
import { renderBoard, renderShipOptions } from "./render";
import { initPlacement } from "./placement";

const ships = [
  { name: "carrier", length: 5, placed: false, coord: null, vertical: false },
  {
    name: "battleship",
    length: 4,
    placed: false,
    coord: null,
    vertical: false,
  },
  { name: "destroyer", length: 3, placed: false, coord: null, vertical: false },
  { name: "submarine", length: 3, placed: false, coord: null, vertical: false },
  { name: "patrol", length: 2, placed: false, coord: null, vertical: false },
];

const board = document.querySelector(".board");
const shipContainer = document.querySelector(".ship-container");
const startBtn = document.querySelector(".start");

renderBoard(board);
renderShipOptions(shipContainer, ships);
initPlacement(ships, board);

startBtn.addEventListener("click", () => {
  alert("hi");
});
