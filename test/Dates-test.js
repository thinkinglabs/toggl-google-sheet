
QUnit.module('Dates', function() {

  QUnit.module('daysInMonth', function() {

    QUnit.test('February 2016 is 29', function( assert ) {
      assert.equal(daysInMonth(2016, 1), 29);
    });

    QUnit.test('January 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 0), 31);
    });
  
    QUnit.test('February 2019 is 28', function( assert ) {
      assert.equal(daysInMonth(2019, 1), 28);
    });

    QUnit.test('March 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 2), 31);
    });

    QUnit.test('April 2019 is 30', function( assert ) {
      assert.equal(daysInMonth(2019, 3), 30);
    });

    QUnit.test('May 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 4), 31);
    });

    QUnit.test('June 2019 is 30', function( assert ) {
      assert.equal(daysInMonth(2019, 5), 30);
    });

    QUnit.test('July 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 6), 31);
    });

    QUnit.test('August 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 7), 31);
    });

    QUnit.test('September 2019 is 30', function( assert ) {
      assert.equal(daysInMonth(2019, 8), 30);
    });

    QUnit.test('October 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 9), 31);
    });

    QUnit.test('November 2019 is 30', function( assert ) {
      assert.equal(daysInMonth(2019, 10), 30);
    });

    QUnit.test('December 2019 is 31', function( assert ) {
      assert.equal(daysInMonth(2019, 11), 31);
    });
  });

  QUnit.test('parseISODateTime', function( assert ) {
    var actual = parseISODateTime('2019-03-15T10:20:03');
    var expected = new Date(2019, 2, 15, 10, 20, 3);
    assert.deepEqual(actual, expected, 'Passed!');
  });

  QUnit.module('formatISODate', function() {

    QUnit.test('2019-03-17', function( assert ) {
      assert.equal(formatISODate(new Date(2019, 2, 17)), '2019-03-17');
    });
  
    QUnit.test('2019-10-01', function( assert ) {
      assert.equal(formatISODate(new Date(2019, 9, 1)), '2019-10-01');
    });

  });
 
  QUnit.module('formatYYYYMM', function() {

    QUnit.test('2019-03-17', function( assert ) {
      assert.equal(formatYYYYMM(new Date(2019, 2, 17)), '201903');
    });

  });

  QUnit.test('firstDayOfMonth', function ( assert ) {
    assert.deepEqual(firstDayOfMonth(new Date(2019, 1, 27)), new Date(2019, 1, 1));
  });

  QUnit.module('lastDayOfMonth', function() {

    QUnit.test('February 2016', function( assert ) {
      assert.deepEqual(lastDayOfMonth(new Date(2016, 1, 15)), new Date(2016, 1, 29));
    });

    QUnit.test('January 2019', function( assert ) {
      assert.deepEqual(lastDayOfMonth(new Date(2019, 0, 11)), new Date(2019, 0, 31));
    });
  
    QUnit.test('February 2019 is 28', function( assert ) {
      assert.deepEqual(lastDayOfMonth(new Date(2019, 1, 21)), new Date(2019, 1, 28));
    });

    QUnit.test('March 2019 is 31', function( assert ) {
      assert.deepEqual(lastDayOfMonth(new Date(2019, 2, 3)), new Date(2019, 2, 31));
    });

  });

});

QUnit.module('String', function() {

  QUnit.test('padStart - 5 -> 05', function( assert ) {
    assert.equal(padStart(5, 2), '05');
  });

  QUnit.test('padStart - 31 -> 31', function( assert ) {
    assert.equal(padStart(31, 2), '31');
  });

});

