import { GameBoard, BOARD_SIZE } from "./gameboard";

export function Player(isComputer) {
  const board = GameBoard();
  const attacked = new Set();

  function attack(board, coord) {
    const key = coord.join(",");
    if (!attacked.has(key)) {
      try {
        board.receiveAttack(coord);
        attacked.add(key);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function randomAttack(board) {
    if (attacked.size === BOARD_SIZE * BOARD_SIZE)
      throw new Error("No valid coords remaining.");

    let coord;
    do {
      coord = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
    } while (attacked.has(coord.join(",")));

    attack(board, coord);
  }

  return {
    isComputer,
    get board() {
      return board;
    },
    get attacked() {
      return attacked;
    },
    attack: isComputer ? randomAttack : attack,
  };
}
