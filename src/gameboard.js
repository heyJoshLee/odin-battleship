const Gameboard = () => {
  const gameboardArray = [];
  const ships = [];
  const OCCUPIED_MARKER = 'occupied';
  const MISS_MARKER = 'miss';
  const HIT_MARKER = 'hit';
  let playerIndex;

  const setUpBoard = (size) => {
    for (let i = 0; i < size; i++) {
      gameboardArray.push(new Array(size).fill(null));
    }
  };

  const setPlayerIndex = (newPlayerIndex) => {
    playerIndex = newPlayerIndex;
  };

  const getPlayerIndex = () => playerIndex;

  const spaceStatus = (x, y) => {
    if (isSpaceOccupied(x, y)) {
      if (gameboardArray[x][y].isHit) {
        return HIT_MARKER;
      }
      return OCCUPIED_MARKER;
    }
    return gameboardArray[x][y];
  };

  const canSpaceBeAttacked = (x, y) => spaceStatus(x, y) === null;

  const isAllShipsSunk = () => ships.every((ship) => ship.isSunk());

  const getGameboardArray = () => gameboardArray;

  const addShip = (shipToAdd) => ships.push(shipToAdd);

  const getShips = () => ships;

  const isSpaceOccupied = (x, y) => !!(gameboardArray[x][y] && typeof gameboardArray[x][y] === 'object');

  const spacesNeededToFitShip = (x, y, shipObject) => {
    const spacesNeeded = [];
    if (shipObject.isVertical()) {
      for (let i = 0; i < shipObject.getLength(); i++) {
        spacesNeeded.push([x + i, y]);
      }
    }

    if (!shipObject.isVertical()) {
      for (let i = 0; i < shipObject.getLength(); i++) {
        spacesNeeded.push([x, y + i]);
      }
    }

    return spacesNeeded;
  };

  const receiveAttack = (x, y) => {
    const outcome = receiveAttackLogic(x, y);
    printReceiveAttackOutCome(x, y, outcome);
  };

  const receiveAttackLogic = (x, y) => {
    const space = gameboardArray[x][y];
    if (isSpaceOccupied(x, y)) {
      space.isHit = true;
      space.ship.hit(space.index);
      return HIT_MARKER;
    }
    gameboardArray[x][y] = MISS_MARKER;
    return MISS_MARKER;
  };

  const printReceiveAttackOutCome = (x, y, outcome) => {
    const spaceOnBoardToChange = findSpaceDOMElement(x, y, playerIndex);
    spaceOnBoardToChange.classList.remove('empty');
    spaceOnBoardToChange.classList.add(outcome);
  };

  const findSpaceDOMElement = (x, y, playerIndex) => {
    const allSpacesOnBoard = Array.from(document.querySelectorAll('.space'));
    const spaceOnBoardToChange = allSpacesOnBoard.find((space) => Number(space.dataset.x) === x && Number(space.dataset.y) === y && Number(space.dataset.boardOwnerPlayerIndex) === playerIndex);
    return spaceOnBoardToChange;
  };

  const canShipFit = (x, y, shipObject) => {
    const spacesNeeded = spacesNeededToFitShip(x, y, shipObject);

    return spacesNeeded.every((coor) => {
      if (gameboardArray[coor[0]] === undefined || gameboardArray[coor[1]] === undefined) {
        return false;
      }
      return !isSpaceOccupied(coor[0], coor[1]);
    });
  };

  const placeShipSectionOnSpace = (ship, sectionIndex, x, y) => {
    gameboardArray[x][y] = { ship, index: sectionIndex, isHit: false };
  };

  const placeShip = (startingX, startingY, shipObject) => {
    addShip(shipObject);
    spacesNeededToFitShip(startingX, startingY, shipObject).forEach((space, index) => {
      printShipSectionToBoard(shipObject, index, space[0], space[1]);
      placeShipSectionOnSpace(shipObject, index, space[0], space[1]);
    });
  };

  const printShipSectionToBoard = (shipObject, shipSectionIndex, x, y) => {
    const space = findSpaceDOMElement(x, y, playerIndex);

    const shipSectionElement = document.createElement('div');
    shipSectionElement.classList.add('ship-section');
    const shipDirection = shipObject.isVertical() ? 'vertical' : 'horizontal';
    shipSectionElement.classList.add(`direction-${shipDirection}`);
    if (shipSectionIndex === 0) {
      shipSectionElement.classList.add('ship-front');
    }
    if (shipSectionIndex === shipObject.getShipHits().length) {
      shipSectionElement.classList.add('ship-back');
    }
    space.appendChild(shipSectionElement);
  };

  const getAvaibleSpaces = () => {
    const outputArray = [];
    gameboardArray.forEach((row, rowIndex) => {
      row.forEach((space, colIndex) => {
        if (space === null) {
          outputArray.push([rowIndex, colIndex]);
        }
      });
    });
    return outputArray;
  };

  const getAvaibleSpacesToAttack = () => {
    const outputArray = [];

    gameboardArray.forEach((row, rowIndex) => {
      row.forEach((arrayItem, colIndex) => {
        if (spaceStatus(rowIndex, colIndex) !== MISS_MARKER && spaceStatus(rowIndex, colIndex) !== HIT_MARKER) {
          outputArray.push([rowIndex, colIndex]);
        }
      });
    });
    return outputArray;
  };

  return {
    getGameboardArray,
    setUpBoard,
    placeShip,
    isSpaceOccupied,
    placeShipSectionOnSpace,
    canShipFit,
    receiveAttack,
    isAllShipsSunk,
    addShip,
    getShips,
    spaceStatus,
    canSpaceBeAttacked,
    getAvaibleSpaces,
    setPlayerIndex,
    getPlayerIndex,
    getAvaibleSpacesToAttack,
  };
};

export default Gameboard;
