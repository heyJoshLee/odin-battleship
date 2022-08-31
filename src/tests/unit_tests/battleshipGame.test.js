import BattleshipGame from '../../battleshipGame';
import Player from '../../player';
import Gameboard from '../../gameboard';

it('.addPlayer() creates a computer player', () => {
  const battleshipGame = BattleshipGame();
  const newPlayer = Player();
  battleshipGame.addPlayer(newPlayer);
  expect(battleshipGame.getPlayers()[0].isHuman()).toBe(false);
});

it('.addPlayer() creates a human player', () => {
  const battleshipGame = BattleshipGame();
  const newPlayer = Player(true);
  battleshipGame.addPlayer(newPlayer);
  expect(battleshipGame.getPlayers()[0].isHuman()).toBe(true);
});

it('.nextPlayerIndex() chooses the next player (index) to play (tries 4 turns)', () => {
  const battleshipGame = BattleshipGame();
  const newPlayer1 = Player();
  const newPlayer2 = Player();

  battleshipGame.addPlayer(newPlayer1);

  battleshipGame.addPlayer(newPlayer2);

  const randomIndex = battleshipGame.chooseRandomPlayerIndex();
  battleshipGame.setCurrentPlayerIndex(randomIndex);

  battleshipGame.setCurrentPlayerIndex(battleshipGame.nextPlayerIndex());
  expect(battleshipGame.getCurrentPlayerIndex() < battleshipGame.getPlayers().length).toBe(true);

  battleshipGame.setCurrentPlayerIndex(battleshipGame.nextPlayerIndex());
  expect(battleshipGame.getCurrentPlayerIndex() < battleshipGame.getPlayers().length).toBe(true);

  battleshipGame.setCurrentPlayerIndex(battleshipGame.nextPlayerIndex());
  expect(battleshipGame.getCurrentPlayerIndex() < battleshipGame.getPlayers().length).toBe(true);

  battleshipGame.setCurrentPlayerIndex(battleshipGame.nextPlayerIndex());
  expect(battleshipGame.getCurrentPlayerIndex() < battleshipGame.getPlayers().length).toBe(true);
});

it('.generatePlayerBoards() creates a new board for each player', () => {
  const battleshipGame = BattleshipGame();
  const newPlayer1 = Player();
  const newPlayer2 = Player();
  const boardSize = 5;

  battleshipGame.addPlayer(newPlayer1);
  battleshipGame.addPlayer(newPlayer2);

  expect(battleshipGame.getPlayers()[0].getGameboard()).toBe(undefined);
  expect(battleshipGame.getPlayers()[1].getGameboard()).toBe(undefined);

  battleshipGame.generatePlayerBoards(Gameboard, boardSize);
  expect(battleshipGame.getPlayers()[0].getGameboard()).not.toBe(undefined);
  expect(battleshipGame.getPlayers()[1].getGameboard()).not.toBe(undefined);
});
