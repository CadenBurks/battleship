import { Ship } from "../models/ship";

test("Increase hits", () => {
  const ship = Ship(5);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship not sunk after hit", () => {
  const ship = Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("Ship sunk after hits", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Non-number length in ship constructor", () => {
  expect(() => Ship("wrong")).toThrow(Error);
});

test("Invalid length integer in ship constructor", () => {
  expect(() => Ship(0)).toThrow(Error);
});
