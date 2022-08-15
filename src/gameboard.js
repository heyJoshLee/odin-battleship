const Gameboard = () => {
  const gameboardArray = [];

  const setUpBoard = (size) => {
    for (let i = 0; i < size; i++) {
      gameboardArray.push(new Array(size).fill(false));
    }
  };

  const getGameboardArray = () => gameboardArray;

  const isSpaceOccupied = (x, y) => gameboardArray[x][y];

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

  const canShipFit = (x, y, shipObject) => {
    const spacesNeeded = spacesNeededToFitShip(x, y, shipObject);

    return spacesNeeded.every((coor) => {
      if (gameboardArray[coor[0]] === undefined || gameboardArray[coor[1] === undefined]) {
        return false;
      }
      return isSpaceOccupied(coor[0], coor[1]) === false;
    });
  };

  const placeShipSectionOnSpace = (x, y) => gameboardArray[x][y] = true;

  const placeShip = (startingX, startingY, shipObject) => {
    spacesNeededToFitShip(startingX, startingY, shipObject).forEach((space) => {
      placeShipSectionOnSpace(space[0], space[1]);
    });
  };

  return {
    getGameboardArray,
    setUpBoard,
    placeShip,
    isSpaceOccupied,
    placeShipSectionOnSpace,
    canShipFit,
  };
};

export default Gameboard;
