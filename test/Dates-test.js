
QUnit.module('Dates', function() {

  QUnit.module('equals', function() {

    QUnit.test('when other is undefined return false', function( assert ) {
      assert.notOk(new Date().equals(undefined), 'Passed!');
    });

  });

});

