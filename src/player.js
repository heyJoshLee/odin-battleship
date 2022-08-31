const Player = (setToHumanCharacter = false) => {
  const human = setToHumanCharacter;
  const isHuman = () => human;
  const playerName = setToHumanCharacter ? 'Human' : 'Computer';

  const getPlayerName = () => playerName;

  let gameboard;

  const setGameboard = (gameboardToAdd) => {
    gameboard = gameboardToAdd;
  };

  const getGameboard = () => gameboard;

  const attackSpace = (gameBoardToAttack, x, y) => {
    const canAttackSpaceOnGameBoard = (gameBoardToAttack, x, y) => gameBoardToAttack.canSpaceBeAttacked(x, y);
    if (!canAttackSpaceOnGameBoard) return false;

    gameBoardToAttack.receiveAttack(x, y);
    return true;
  };

  const attackRandomSpace = (gameBoardToAttack) => {
    const spacesToChooseFrom = gameBoardToAttack.getAvaibleSpacesToAttack();
    const randomIndex = Math.floor(Math.random() * spacesToChooseFrom.length);
    const randomCords = spacesToChooseFrom[randomIndex];
    if (attackSpace(gameBoardToAttack, randomCords[0], randomCords[1])) {
      return randomCords;
    }
    return false;
  };
  return {
    isHuman,
    setGameboard,
    getGameboard,
    attackSpace,
    attackRandomSpace,
    getPlayerName,
  };
};

export default Player;
