const dates = require('./Dates');

test('first day of the month', () => {
  expect(dates.firstDayOfMonth(new Date(2019, 1, 27))).toStrictEqual(new Date(2019, 1, 1));
});
