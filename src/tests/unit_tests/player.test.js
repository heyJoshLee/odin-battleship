import Player from '../../player';
import Gameboard from '../../gameboard';
import Ship from '../../ship';
import BattleshipGame from '../../battleshipGame';

it('.isHuman() returns false if not set', () => {
  const player = Player();
  expect(player.isHuman()).toBe(false);
});

it('.isHuman() returns true is the player is human', () => {
  const player = Player(true);
  expect(player.isHuman()).toBe(true);
});

it('.setGameboard() adds a gameboard to the player', () => {
  const player = Player();
  const gameBoard = Gameboard();
  player.setGameboard(gameBoard);
  expect(player.getGameboard()).toBe(gameBoard);
});

describe('sets up game so DOM testing doesn\'t break', () => {
  let battleshipGame;
  let player1;
  let player2;
  let player2Gameboard;
  beforeEach(() => {
    const pageContainerElement = document.createElement('div');
    pageContainerElement.id = 'page-container';
    document.body.appendChild(pageContainerElement);
    battleshipGame = BattleshipGame();
    player1 = Player();
    player2 = Player();
    battleshipGame.addPlayer(player1);
    battleshipGame.addPlayer(player2);

    battleshipGame.generatePlayerBoards(Gameboard, 10);
    battleshipGame.printPlayerBoards();
    player2Gameboard = player2.getGameboard();
  });

  it('Player can sink one battleship but not all of them', () => {
    const ship1 = Ship(3, true);
    const ship2 = Ship(3, true);

    battleshipGame.getPlayers()[1].getGameboard().placeShip(0, 0, ship1);
    battleshipGame.getPlayers()[1].getGameboard().placeShip(1, 1, ship2);

    player1.attackSpace(player2.getGameboard(), 0, 0);
    expect(player2.getGameboard().spaceStatus(0, 0)).toBe('hit');
    player1.attackSpace(player2.getGameboard(), 1, 0);
    expect(player2.getGameboard().spaceStatus(1, 0)).toBe('hit');
    player1.attackSpace(player2.getGameboard(), 2, 0);
    expect(player2.getGameboard().spaceStatus(2, 0)).toBe('hit');
    expect(player2.getGameboard().isAllShipsSunk()).toBe(false);
  });

  it('Player can sink all battle ships of other player', () => {
    const ship1 = Ship(3, true);
    const ship2 = Ship(3, true);
    player2Gameboard.placeShip(0, 0, ship1);
    player2Gameboard.placeShip(0, 1, ship1);

    player1.attackSpace(player2Gameboard, 0, 0);
    player1.attackSpace(player2Gameboard, 1, 0);
    player1.attackSpace(player2Gameboard, 2, 0);

    player1.attackSpace(player2Gameboard, 0, 1);
    player1.attackSpace(player2Gameboard, 1, 2);
    player1.attackSpace(player2Gameboard, 1, 3);
    expect(player2Gameboard.isAllShipsSunk()).toBe(true);
  });

  it('.attackSpace() attacks a space on board and hits a ship', () => {
    const ship1 = Ship(1, true);
    player2Gameboard.placeShip(0, 0, ship1);
    player1.attackSpace(player2Gameboard, 0, 0);
    expect(player2Gameboard.spaceStatus(0, 0)).toBe('hit');
  });

  it('.attackSpace() attacks a space on board and misses', () => {
    const ship1 = Ship(1, true);

    player2Gameboard.placeShip(0, 0, ship1);
    player1.attackSpace(player2.getGameboard(), 2, 2);
    expect(player2.getGameboard().spaceStatus(2, 2)).toBe('miss');
  });

  it('.attackRandomSpace() attacks an available random space', () => {
    const cordsToAttack = player2.attackRandomSpace(player1.getGameboard());
    expect(player1.getGameboard().spaceStatus(cordsToAttack[0], cordsToAttack[1])).toBe('miss');
  });
});
