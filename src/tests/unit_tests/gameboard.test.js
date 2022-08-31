import Gameboard from '../../gameboard';
import Ship from '../../ship';
import BattleShipGame from '../../battleshipGame';
import Player from '../../player';

it('.setUpBoard() creates a 3X3 array', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(4);

  const expectedOutput = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  expect(gameBoard.getGameboardArray()).toStrictEqual(expectedOutput);
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

it('.addShip() adds a ship to the ships array', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(10);
  const ship1 = Ship(4, true);
  gameBoard.addShip(ship1);
  expect(gameBoard.getShips().length).toBe(1);
});

it('.addShip() adds multiple ships to the ships array', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(10);
  const ship1 = Ship(4, true);
  const ship2 = Ship(3, false);

  gameBoard.addShip(ship1);
  gameBoard.addShip(ship2);

  expect(gameBoard.getShips().length).toBe(2);
});

it('.isAllShipsSunk() returns false if all ships are not sunk', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(10);
  const ship1 = Ship(4, true);
  const ship2 = Ship(3, false);
  const ship3 = Ship(2, true);
  gameBoard.addShip(ship1);
  gameBoard.addShip(ship2);
  gameBoard.addShip(ship3);
  ship1.sinkShip();
  ship2.sinkShip();
  expect(gameBoard.isAllShipsSunk()).toBe(false);
});

it('.isAllShipsSunk() returns true if all ships are sunk', () => {
  const gameBoard = Gameboard();
  gameBoard.setUpBoard(10);
  const ship1 = Ship(4, true);
  const ship2 = Ship(3, false);
  const ship3 = Ship(2, true);
  gameBoard.addShip(ship1);
  gameBoard.addShip(ship2);
  gameBoard.addShip(ship3);
  ship1.sinkShip();
  ship2.sinkShip();
  ship3.sinkShip();
  expect(gameBoard.isAllShipsSunk()).toBe(true);
});

it('.getAvaibleSpaces() returns an array of cordinates of empty spaces 1', () => {
  const gameboard = Gameboard();
  gameboard.setUpBoard(4);

  const expectedOutput = [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [3, 0], [3, 1], [3, 2], [3, 3],
  ];
  expect(gameboard.getAvaibleSpaces()).toStrictEqual(expectedOutput);
});

it('.getAvaibleSpaces() returns an array of cordinates of empty spaces 1', () => {
  const gameboard = Gameboard();
  gameboard.setUpBoard(4);

  const expectedOutput = [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [3, 0], [3, 1], [3, 2], [3, 3],
  ];
  expect(gameboard.getAvaibleSpaces()).toStrictEqual(expectedOutput);
});

describe('sets up game so DOM testing doesn\'t break - match 1', () => {
  const pageContainerElement = document.createElement('div');
  pageContainerElement.id = 'page-container';
  document.body.appendChild(pageContainerElement);
  const battleshipGame = BattleShipGame();
  const player1 = Player();
  const player2 = Player();
  battleshipGame.addPlayer(player1);
  battleshipGame.addPlayer(player2);

  battleshipGame.generatePlayerBoards(Gameboard, 10);
  battleshipGame.printPlayerBoards();

  it('.receiveAttack() changes space to hit if there is a ship there', () => {
    const gameBoard = battleshipGame.getPlayers()[0].getGameboard();
    const ship = Ship(2, false);
    gameBoard.placeShip(0, 0, ship);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.spaceStatus(0, 0)).toBe('hit');
  });

  it('.receiveAttack() damagaes a ship section', () => {
    const gameBoard = battleshipGame.getPlayers()[0].getGameboard();
    const ship = Ship(2, false);
    gameBoard.placeShip(0, 0, ship);
    gameBoard.receiveAttack(0, 0);
    expect(ship.isAreaHit(0)).toBe(true);
  });

  it('.receiveAttack() changes space to miss is there is not a ship there', () => {
    const gameBoard = battleshipGame.getPlayers()[0].getGameboard();
    gameBoard.receiveAttack(1, 1);
    expect(gameBoard.spaceStatus(1, 1)).toBe('miss');
  });
});

describe('sets up game so DOM testing doesn\'t break match (wipes game and board each test', () => {
  const pageContainerElement = document.createElement('div');
  pageContainerElement.id = 'page-container';
  document.body.appendChild(pageContainerElement);
  let battleshipGame;
  let player1;
  let player2;
  let gameboard;

  beforeEach(() => {
    battleshipGame = BattleShipGame();
    player1 = Player();
    player2 = Player();
    battleshipGame.addPlayer(player1);
    battleshipGame.addPlayer(player2);

    battleshipGame.generatePlayerBoards(Gameboard, 10);
    battleshipGame.printPlayerBoards();
    gameboard = battleshipGame.getPlayers()[0].getGameboard();
  });

  it('.getAvaibleSpaces() returns an array of cordinates of empty spaces 2', () => {
    const ship1 = Ship(2, true);
    const ship2 = Ship(3, false);
    gameboard.placeShip(0, 0, ship1);
    gameboard.placeShip(3, 1, ship2);

    const expectedOutput = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
      [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9],
      [3, 0], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
      [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
      [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
      [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
      [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
      [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9],
    ];
    expect(gameboard.getAvaibleSpaces()).toStrictEqual(expectedOutput);
  });

  it('.placeShip() places 3 length ship horizontally 2', () => {
    const ship = Ship(2, false);
    gameboard.placeShip(1, 1, ship);
    const expectedOutput = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, { ship, index: 0, isHit: false }, { ship, index: 1, isHit: false }, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    expect(gameboard.getGameboardArray()).toStrictEqual(expectedOutput);
  });

  it('.placeShip() places 3 length ship horizontally 1', () => {
    const ship = Ship(3, false);
    gameboard.placeShip(0, 0, ship);

    const expectedOutput = [
      [{ ship, index: 0, isHit: false }, { ship, index: 1, isHit: false }, { ship, index: 2, isHit: false }, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];

    expect(gameboard.getGameboardArray()).toStrictEqual(expectedOutput);
  });

  it('.placeShip() places 5 length ship vertically 2', () => {
    const ship = Ship(5, true);
    gameboard.placeShip(1, 1, ship);

    const expectedOutput = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, { ship, index: 0, isHit: false }, null, null, null, null, null, null, null, null],
      [null, { ship, index: 1, isHit: false }, null, null, null, null, null, null, null, null],
      [null, { ship, index: 2, isHit: false }, null, null, null, null, null, null, null, null],
      [null, { ship, index: 3, isHit: false }, null, null, null, null, null, null, null, null],
      [null, { ship, index: 4, isHit: false }, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    expect(gameboard.getGameboardArray()).toStrictEqual(expectedOutput);
  });

  it('.placeShip() places 3 length ship vertically 1', () => {
    const ship = Ship(3, true);
    gameboard.placeShip(0, 0, ship);

    const expectedOutput = [
      [{ ship, index: 0, isHit: false }, null, null, null, null, null, null, null, null, null],
      [{ ship, index: 1, isHit: false }, null, null, null, null, null, null, null, null, null],
      [{ ship, index: 2, isHit: false }, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    expect(gameboard.getGameboardArray()).toStrictEqual(expectedOutput);
  });

  it('.isSpaceOccupied returns false for unoccupied space', () => {
    const ship = Ship(2, true);
    gameboard.placeShip(0, 0, ship);
    expect(gameboard.isSpaceOccupied(1, 1)).toBe(false);
  });

  it('.isSpaceOccupied returns true for occupied space', () => {
    const ship = Ship(2, false);
    gameboard.placeShip(0, 0, ship);
    expect(gameboard.isSpaceOccupied(0, 1)).toBe(true);
  });

  it('.placeShipSectionOnSpace() changes area to occupied', () => {
    const ship = Ship(2, false);
    gameboard.placeShip(1, 1, ship);

    expect(gameboard.spaceStatus(0, 0)).toBe(null);
    expect(gameboard.spaceStatus(1, 1)).toBe('occupied');
  });
});
