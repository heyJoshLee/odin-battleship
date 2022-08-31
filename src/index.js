import Ship from './ship';
import Player from './player';
import Gameboard from './gameboard';
import BattleshipGame from './battleshipGame';

const battleshipGame = BattleshipGame();

battleshipGame.generateTestMatch(Player, Gameboard, Ship);
