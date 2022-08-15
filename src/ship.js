const Ship = (shipLength, isVerticalBoolean) => {
  const length = shipLength;
  const isVertical = () => isVerticalBoolean;
  const shipHits = new Array(length).fill(false);

  const isSunk = () => shipHits.every((section) => section);

  const getLength = () => length;

  const hit = (areaToHit) => { shipHits[areaToHit] = true; };

  const isAreaHit = (areaToCheck) => shipHits[areaToCheck];

  return {
    hit,
    isAreaHit,
    isSunk,
    isVertical,
    getLength,
  };
};

export default Ship;
