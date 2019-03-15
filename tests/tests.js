QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test('parseISODateTime', function( assert ) {
  var actual = parseISODateTime('2019-03-15T10:20:03');
  var expected = new Date(2019, 2, 15, 10, 20, 3);
  assert.deepEqual(actual, expected);
});
