import Gameboard from '../../gameboard';
import Ship from '../../ship';

it('.setUpBoard() creates a 3X3 array', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);

  const expectedOutput = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];
  expect(gameBoard.getGameboardArray()).toStrictEqual(expectedOutput);
});

it('.placeShipSectionOnSpace() changes area to true', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);
  gameBoard.placeShipSectionOnSpace(1, 1);

  expect(gameBoard.getGameboardArray()[0][0]).toBe(false);
  expect(gameBoard.getGameboardArray()[1][1]).toBe(true);
});

it('.isSpaceOccupied returns true for occupied space', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);
  gameBoard.placeShipSectionOnSpace(1, 1);
  expect(gameBoard.isSpaceOccupied(1, 1)).toBe(true);
});

it('.isSpaceOccupied returns false for unoccupied space', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);
  gameBoard.placeShipSectionOnSpace(1, 2);
  expect(gameBoard.isSpaceOccupied(1, 1)).toBe(false);
});

it('.canShipFit() returns true if vertical ship can fit on board 1', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);
  const ship = Ship(4, true);
  expect(gameBoard.canShipFit(0, 0, ship)).toBe(true);
});

it('.canShipFit() returns true if vertical ship can fit on board 2', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(9);
  const ship = Ship(2, true);
  expect(gameBoard.canShipFit(6, 7, ship)).toBe(true);
});

it('.canShipFit() returns true if horizontal ship can fit on board 1', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);
  const ship = Ship(4, false);
  expect(gameBoard.canShipFit(0, 0, ship)).toBe(true);
});

it('.canShipFit() returns true if horizontal ship can fit on board 2', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(5);
  const ship = Ship(3, false);
  expect(gameBoard.canShipFit(1, 1, ship)).toBe(true);
});

it('.canShipfit() returns false if the space is off the map 1', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(2);
  const ship = Ship(4, false);
  expect(gameBoard.canShipFit(0, 0, ship)).toBe(false);
});

it('.canShipfit() returns false if the space is off the map 2', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(10);
  const ship = Ship(2, true);
  expect(gameBoard.canShipFit(9, 9, ship)).toBe(false);
});

it('.placeShip() places 3 length ship vertically 1', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(5);
  const ship = Ship(3, true);
  gameBoard.placeShip(0, 0, ship);
  const expectedOutput = [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];
  expect(gameBoard.getGameboardArray()).toStrictEqual(expectedOutput);
});

it('.placeShip() places 5 length ship vertically 2', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(10);
  const ship = Ship(5, true);
  gameBoard.placeShip(1, 1, ship);
  const expectedOutput = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];
  expect(gameBoard.getGameboardArray()).toStrictEqual(expectedOutput);
});

it('.placeShip() places 3 length ship horizontally 1', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(5);
  const ship = Ship(3, false);
  gameBoard.placeShip(0, 0, ship);
  const expectedOutput = [
    [true, true, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];
  expect(gameBoard.getGameboardArray()).toStrictEqual(expectedOutput);
});

it('.placeShip() places 3 length ship horizontally 2', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(5);
  const ship = Ship(2, false);
  gameBoard.placeShip(1, 1, ship);
  const expectedOutput = [
    [false, false, false, false, false],
    [false, true, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];
  expect(gameBoard.getGameboardArray()).toStrictEqual(expectedOutput);
});
