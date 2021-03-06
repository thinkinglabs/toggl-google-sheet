import {firstDayOfMonth, daysInMonth, lastDayOfMonth, parseISODateTime, formatISODate, formatYYYYMM} from './Dates.js';

test('first day of the month of February 2019', () => {
  expect(firstDayOfMonth(new Date(2019, 1, 27))).toStrictEqual(new Date(2019, 1, 1));
});

test('days in the month of February 2016 is 29', () => {
  expect(daysInMonth(2016, 1)).toBe(29);
});

test('days in the month of January 2019 is 31', () => {
  expect(daysInMonth(2019, 0)).toBe(31);
});

test('days in the month of February 2019 is 28', () => {
  expect(daysInMonth(2019, 1)).toBe(28);
});

test('days in the month of March 2019 is 31', () => {
  expect(daysInMonth(2019, 2)).toBe(31);
});

test('days in the month of April 2019 is 30', () => {
  expect(daysInMonth(2019, 3)).toBe(30);
});

test('days in the month of May 2019 is 31', () => {
  expect(daysInMonth(2019, 4)).toBe(31);
});

test('days in the month of June 2019 is 30', () => {
  expect(daysInMonth(2019, 5)).toBe(30);
});

test('days in the month of July 2019 is 31', () => {
  expect(daysInMonth(2019, 6)).toBe(31);
});

test('days in the month of August 2019 is 31', () => {
  expect(daysInMonth(2019, 7)).toBe(31);
});

test('days in the month of September 2019 is 30', () => {
  expect(daysInMonth(2019, 8)).toBe(30);
});

test('days in the month of October 2019 is 31', () => {
  expect(daysInMonth(2019, 9)).toBe(31);
});

test('days in the month of November 2019 is 30', () => {
  expect(daysInMonth(2019, 10)).toBe(30);
});

test('days in the month of December 2019 is 31', () => {
  expect(daysInMonth(2019, 11)).toBe(31);
});

test('last day of the month of February 2016 is the 29th', () => {
  expect(lastDayOfMonth(new Date(2016, 1, 15))).toStrictEqual(new Date(2016, 1, 29));
});

test('last day of the month of January 2019 is the 31st', () => {
  expect(lastDayOfMonth(new Date(2019, 0, 11))).toStrictEqual(new Date(2019, 0, 31));
});

test('last day of the month of February 2019 is the 28th', () => {
  expect(lastDayOfMonth(new Date(2019, 1, 21))).toStrictEqual(new Date(2019, 1, 28));
});

test('last day of the month of March 2019 is the 31st', () => {
  expect(lastDayOfMonth(new Date(2019, 2, 3))).toStrictEqual(new Date(2019, 2, 31));
});

test('last day of the month of April 2019 is the 30th', () => {
  expect(lastDayOfMonth(new Date(2019, 3, 9))).toStrictEqual(new Date(2019, 3, 30));
});

test('parse ISO datetime 2019-03-15T10:20:03 is March 15th 1019 at 10:20:03', () => {
  var actual = parseISODateTime('2019-03-15T10:20:03');
  var expected = new Date(2019, 2, 15, 10, 20, 3);
  expect(actual).toStrictEqual(expected);
});

test('format ISO datetime 2019-03-17', () =>  {
  expect(formatISODate(new Date(2019, 2, 17))).toBe('2019-03-17');
});

test('format ISO datetime 2019-10-01', () => {
  expect(formatISODate(new Date(2019, 9, 1))).toBe('2019-10-01');
});

test('format YYYYMM 2019-03-17', () => {
  expect(formatYYYYMM(new Date(2019, 2, 17))).toBe('201903');
});
