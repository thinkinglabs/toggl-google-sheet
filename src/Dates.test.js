const dates = require('./Dates');

test('first day of the month of February 2019', () => {
  expect(dates.firstDayOfMonth(new Date(2019, 1, 27))).toStrictEqual(new Date(2019, 1, 1));
});

test('last day of the month of February 2016 is the 29th', () => {
  expect(dates.lastDayOfMonth(new Date(2016, 1, 15))).toStrictEqual(new Date(2016, 1, 29));
});

test('last day of the month of January 2019 is the 31st', () => {
  expect(dates.lastDayOfMonth(new Date(2019, 0, 11))).toStrictEqual(new Date(2019, 0, 31));
});

test('last day of the month of February 2019 is the 28th', () => {
  expect(dates.lastDayOfMonth(new Date(2019, 1, 21))).toStrictEqual(new Date(2019, 1, 28));
});

test('last day of the month of March 2019 is the 31st', () => {
  expect(dates.lastDayOfMonth(new Date(2019, 2, 3))).toStrictEqual(new Date(2019, 2, 31));
});

test('last day of the month of April 2019 is the 30th', () => {
  expect(dates.lastDayOfMonth(new Date(2019, 3, 9))).toStrictEqual(new Date(2019, 3, 30));
});
