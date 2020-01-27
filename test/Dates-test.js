
QUnit.module('Dates', function() {

  QUnit.test('parseISODateTime', function( assert ) {
    var actual = parseISODateTime('2019-03-15T10:20:03');
    var expected = new Date(2019, 2, 15, 10, 20, 3);
    assert.deepEqual(actual, expected, 'Passed!');
  });

  QUnit.module('formatISODate', function() {

    QUnit.test('2019-03-17', function( assert ) {
      assert.equal(formatISODate(new Date(2019, 2, 17)), '2019-03-17', 'Passed!');
    });
  
    QUnit.test('2019-10-01', function( assert ) {
      assert.equal(formatISODate(new Date(2019, 9, 1)), '2019-10-01', 'Passed!');
    });

  });
 
  QUnit.module('formatYYYYMM', function() {

    QUnit.test('2019-03-17', function( assert ) {
      assert.equal(formatYYYYMM(new Date(2019, 2, 17)), '201903', 'Passed!');
    });

  });

  QUnit.module('equals', function() {

    QUnit.test('when other is undefined return false', function( assert ) {
      assert.notOk(new Date().equals(undefined), 'Passed!');
    });

    QUnit.test('when other is not a Date return false', function( assert ) {
      assert.notOk(new Date().equals('not a date'), 'Passed!');
    });

    QUnit.test('when other has same identity return true', function( assert ) {
      var actual = new Date();
      var expected = actual;
      assert.ok(actual.equals(expected), 'Passed!');
    });

    QUnit.test('when other has same values return true', function( assert ) {
      //REMARK: timezone offsets are evaluated at construction time by offsetting the hours
      var actual = new Date("2019-05-13T17:09:11.123");
      var expected = new Date("2019-05-13T17:09:11.123");
      assert.ok(actual.equals(expected), 'Passed!');
    });

    QUnit.test('when other has different timezone return false', function( assert ) {
      //REMARK: timezone offsets are evaluated at construction time by offsetting the hours
      var actual = new Date("2019-05-13T17:09:11.123+0200");
      var expected = new Date("2019-05-13T17:09:11.123+0100");
      assert.notOk(actual.equals(expected), 'Passed!');
    });
  });

});

QUnit.module('String', function() {

  QUnit.test('padStart - 5 -> 05', function( assert ) {
    assert.equal(padStart(5, 2), '05', 'Passed!');
  });

  QUnit.test('padStart - 31 -> 31', function( assert ) {
    assert.equal(padStart(31, 2), '31', 'Passed!');
  });

});

