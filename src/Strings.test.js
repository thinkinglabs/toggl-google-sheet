import { padStart } from './Strings.js';

test('zero left padding of 5 should be 05', () => {
  expect(padStart(5, 2)).toBe('05');
});

test('zero left padding of 31 should be 31', () => {
  expect(padStart(31, 2)).toBe('31');
});
