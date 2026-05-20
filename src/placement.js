import { BOARD_SIZE } from "./models/gameboard";

let preview = [];
let selected = null;
let isVertical = false;

function getPreviewCoords(startRow, startCol) {
  if (!selected) return [];

  const coords = [[startRow, startCol]];
  const shipLength = selected.children.length;

  if (isVertical) {
    for (let i = 1; i < shipLength; i++) {
      coords.push([startRow + i, startCol]);
    }
  } else {
    for (let i = 1; i < shipLength; i++) {
      coords.push([startRow, startCol + i]);
    }
  }

  return coords;
}

function isPreviewInvalid(coords) {
  return coords.some(([row, col]) => {
    if (row >= BOARD_SIZE || col >= BOARD_SIZE) return true;

    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`,
    );
    return Boolean(cell?.dataset.ship);
  });
}

// Selects a ship to place on the board
function selectShip(ships) {
  const shipDivs = document.querySelectorAll(".ship");
  shipDivs.forEach((shipDiv) => {
    shipDiv.addEventListener("click", () => {
      shipDivs.forEach((s) => s.classList.remove("selected"));

      if (selected === shipDiv) {
        selected = null;
      } else {
        selected = shipDiv;
        shipDiv.classList.add("selected");
        shipDiv.classList.remove("placed");

        const shipData = ships.find((s) => s.name === shipDiv.dataset.name);
        if (shipData.placed) {
          shipData.placed = false;
          document
            .querySelectorAll(`[data-ship="${shipDiv.dataset.name}"]`)
            .forEach((c) => {
              c.classList.remove("placed");
              delete c.dataset.ship;
            });
        }
      }
    });
  });
}

export function initPlacement(ships, board) {
  // Show preview of ship on the board
  board.addEventListener("mouseover", (e) => {
    const cell = e.target;

    if (!cell.classList.contains("cell")) return;

    preview = [];
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    document.querySelectorAll(".board .selected").forEach((c) => {
      c.classList.remove("selected", "invalid");
    });

    if (selected) {
      preview = getPreviewCoords(row, col);
    }

    if (preview.length) {
      const previewIsInvalid = isPreviewInvalid(preview);

      preview.forEach((coord) => {
        let selectedCell = document.querySelector(
          `[data-row="${coord[0]}"][data-col="${coord[1]}"]`,
        );
        if (selectedCell) {
          selectedCell.classList.add("selected");
          if (previewIsInvalid) selectedCell.classList.add("invalid");
        }
      });
    }
  });

  // Clear preview when mouse leaves board
  board.addEventListener("mouseleave", () => {
    document.querySelectorAll(".board .cell.selected").forEach((c) => {
      c.classList.remove("selected", "invalid");
    });
    preview = [];
  });

  // Places ship on board
  board.addEventListener("click", () => {
    if (preview.length) {
      const shipData = ships.find((s) => s.name === selected.dataset.name);

      if (isPreviewInvalid(preview) || shipData.placed) return;

      shipData.placed = true;
      shipData.coord = preview[0];
      shipData.vertical = isVertical;

      selected.classList.remove("selected");
      selected.classList.add("placed");
      selected = null;
      preview.forEach((coord) => {
        let selectedCell = document.querySelector(
          `[data-row="${coord[0]}"][data-col="${coord[1]}"]`,
        );
        if (selectedCell) {
          selectedCell.dataset.ship = shipData.name;
          selectedCell.classList.add("placed");
        }
      });

      if (ships.every((s) => s.placed)) {
        document.querySelector(".start").removeAttribute("disabled");
      }
    }
  });

  // To change ship orientation
  document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
      isVertical = !isVertical;
    }
  });
  selectShip(ships);
}
