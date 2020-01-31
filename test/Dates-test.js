
QUnit.module('Dates', function() {

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

