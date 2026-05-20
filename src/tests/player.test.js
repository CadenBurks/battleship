import { Player } from "../models/player";
import { Ship } from "../models/ship";
import { HIT } from "../models/gameboard";

test("Successful player attack", () => {
  const player = Player();
  const computer = Player(true);
  const computerBoard = computer.board;

  const computerShip = Ship(3);
  computerBoard.placeShip(computerShip, [0, 0]);

  player.attack(computerBoard, [0, 0]);

  expect(computerBoard.grid[0][0].value).toBe(HIT);
  expect(player.attacked.has("0,0")).toBe(true);
});

test("Successful computer attack", () => {
  const player = Player();
  const computer = Player(true);
  const playerBoard = player.board;

  const playerShip = Ship(3);
  playerBoard.placeShip(playerShip, [0, 0]);

  computer.attack(playerBoard);

  expect(computer.attacked.size).toBe(1);
});

test("Player cannot attack same coordinate twice", () => {
  const player = Player();
  const computer = Player(true);
  const computerBoard = computer.board;

  player.attack(computerBoard, [0, 0]);
  player.attack(computerBoard, [0, 0]);

  expect(player.attacked.size).toBe(1);
});

test("Computer does not attack same coordinate twice", () => {
  const player = Player();
  const computer = Player(true);

  computer.attack(player.board);
  computer.attack(player.board);

  expect(computer.attacked.size).toBe(2);
});
