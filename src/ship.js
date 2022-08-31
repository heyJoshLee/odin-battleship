const Ship = (shipLength, isVerticalBoolean) => {
  const length = shipLength;
  const isVertical = () => isVerticalBoolean;
  const shipHits = new Array(length).fill(false);

  const isSunk = () => shipHits.every((section) => section);

  const getLength = () => length;

  const getShipHits = () => shipHits;

  const hit = (areaToHit) => { shipHits[areaToHit] = true; };

  const isAreaHit = (areaToCheck) => shipHits[areaToCheck];

  const sinkShip = () => shipHits.forEach((area, i) => hit(i));

  return {
    hit,
    isAreaHit,
    isSunk,
    isVertical,
    getLength,
    sinkShip,
    getShipHits,
  };
};

export default Ship;
