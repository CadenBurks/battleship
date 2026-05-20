import { Ship } from "./ship";

export const BOARD_SIZE = 10;
export const MISS = 0;
export const HIT = 1;
export const SHIP = 2;

export function GameBoard() {
  const grid = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({ id: null, value: null })),
  );
  const ships = new Map();

  function placeShip(ship, startCoord) {
    const [row, col] = startCoord;
    const placementCoords = [startCoord];

    if (ship.isVertical) {
      for (let i = 1; i < ship.getLength(); i++) {
        if (row + i >= BOARD_SIZE) {
          throw new Error("Invalid Ship Placement.");
        }
        placementCoords.push([row + i, col]);
      }
    } else {
      for (let i = 1; i < ship.getLength(); i++) {
        if (col + i >= BOARD_SIZE) {
          throw new Error("Invalid Ship Placement.");
        }
        placementCoords.push([row, col + i]);
      }
    }

    if (placementCoords.some(([r, c]) => grid[r][c].value === SHIP)) {
      console.log("overlap detected at", placementCoords);
      throw new Error("Ships cannot overlap.");
    }

    ships.set(ships.size, ship);

    placementCoords.forEach((coord) => {
      const [row, col] = coord;
      grid[row][col] = { id: ships.size - 1, value: SHIP };
    });
  }

  function receiveAttack(attackCoord) {
    const [row, col] = attackCoord;

    if (grid[row][col].value === MISS)
      throw new Error("Already missed at this coordinate.");
    if (grid[row][col].value === HIT)
      throw new Error("Already hit at this coordinate.");

    if (grid[row][col].value === SHIP) {
      grid[row][col].value = HIT;
      ships.get(grid[row][col].id).hit();
    } else grid[row][col].value = MISS;
  }

  function allSunk() {
    return [...ships.values()].every((ship) => ship.isSunk());
  }

  return {
    get grid() {
      return grid;
    },
    placeShip,
    receiveAttack,
    allSunk,
  };
}
