
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
      var actual = new Date("2019-05-13T17:09:11.123");
      var expected = new Date(2019, 4, 13, 17, 9, 11, 123);
      assert.ok(actual.equals(expected), 'Passed!');
    });

    QUnit.test('when other has different timezone return false', function( assert ) {
      var actual = new Date("2019-05-13T17:09:11.123Z02:00");
      var expected = new Date("2019-05-13T17:09:11.123Z00:00");
      assert.notOk(actual.equals(expected), 'Passed!');
    });
  });

});

