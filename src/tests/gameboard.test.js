import { GameBoard, BOARD_SIZE, MISS, HIT, SHIP } from "../models/gameboard";
import { Ship } from "../models/ship";

test("Valid horizontal ship placement", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    board.placeShip(ship, [0, 0]);
    const grid = board.grid;
    
    expect(grid[0][0].value).toBe(SHIP);
    expect(grid[1][0].value).toBe(SHIP);
    expect(grid[2][0].value).toBe(SHIP);
    expect(grid[3][0].value).toBe(null);
});

test("Valid vertical ship placement", () => {
    const board = GameBoard();
    const ship = Ship(3, true);

    board.placeShip(ship, [0, 0]);
    const grid = board.grid;
    
    expect(grid[0][0].value).toBe(SHIP);
    expect(grid[0][1].value).toBe(SHIP);
    expect(grid[0][2].value).toBe(SHIP);
    expect(grid[0][3].value).toBe(null);
});

test("Invalid horizontal ship placement", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    expect(() => board.placeShip(ship, [BOARD_SIZE - 1, 0])).toThrow(Error);
});

test("Invalid vertical ship placement", () => {
    const board = GameBoard();
    const ship = Ship(3, true);

    expect(() => board.placeShip(ship, [0, BOARD_SIZE - 1])).toThrow(Error);
});

test("Overlapping ship placement", () => {
    const board = GameBoard();
    const ship1 = Ship(3, false);
    const ship2 = Ship(3, false);

    board.placeShip(ship1, [0, 0]);

    expect(() => board.placeShip(ship2, [0, 0])).toThrow(Error);
});

test("Valid attack", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    board.placeShip(ship, [0,0]);
    board.receiveAttack([0,0]);

    expect(board.grid[0][0].value).toBe(HIT);
});

test("Valid miss", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    board.placeShip(ship, [0,0]);
    board.receiveAttack([9,0]);

    expect(board.grid[9][0].value).toBe(MISS);
});

test("Overlapping hit", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    board.placeShip(ship, [0,0]);
    board.receiveAttack([0,0]);

    expect(() => board.receiveAttack([0,0])).toThrow(Error);
});

test("Overlapping miss", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    board.placeShip(ship, [0,0]);
    board.receiveAttack([9,0]);
    
    expect(() => board.receiveAttack([9,0])).toThrow(Error);
});

test("Single ship sunk", () => {
    const board = GameBoard();
    const ship = Ship(3, false);

    board.placeShip(ship, [0,0]);
    board.receiveAttack([0,0]);
    board.receiveAttack([1,0]);
    board.receiveAttack([2,0]);
    
    expect(board.allSunk()).toBe(true);
});

test("All ships not sunk", () => {
    const board = GameBoard();
    const ship1 = Ship(1, false);
    const ship2 = Ship(1, false);

    board.placeShip(ship1, [0,0]);
    board.placeShip(ship2, [1,0]);
    board.receiveAttack([0,0]);
    
    expect(board.allSunk()).toBe(false);
});

test("All ships sunk", () => {
    const board = GameBoard();
    const ship1 = Ship(1, false);
    const ship2 = Ship(1, false);

    board.placeShip(ship1, [0,0]);
    board.placeShip(ship2, [1,0]);
    board.receiveAttack([0,0]);
    board.receiveAttack([1,0]);
    
    expect(board.allSunk()).toBe(true);
});