import Ship from '../../ship';

it('should see this as a test', () => {
  const ship = Ship();
  expect(ship.sayHi()).toBe('hi');
});
