import Ship from '../../ship';

it('creates a new ship with n false spots', () => {
  const ship = Ship(3, null);
  expect(ship.isAreaHit(0)).toBe(false);
  expect(ship.isAreaHit(1)).toBe(false);
  expect(ship.isAreaHit(2)).toBe(false);
});

it('.isSunk() returns false if not all areas are hit ', () => {
  const ship = Ship(3, null);
  ship.hit(0);
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});

it('.isSunk() returns true if all areas are hit ', () => {
  const ship = Ship(3, null);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
});

it('.hit() hits an area of a ship', () => {
  const ship = Ship(3, null);
  ship.hit(0);
  expect(ship.isAreaHit(1)).toBe(false);
  expect(ship.isAreaHit(0)).toBe(true);
});

it('.hit() multiple hits hit multiple areas of a ship', () => {
  const ship = Ship(5, null);
  ship.hit(4);
  ship.hit(0);
  expect(ship.isAreaHit(4)).toBe(true);
  expect(ship.isAreaHit(0)).toBe(true);
  expect(ship.isAreaHit(1)).toBe(false);
});
