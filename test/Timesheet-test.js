
QUnit.module('Timesheet', function() {

  QUnit.module('TimesheetDateEntry', function() {

    QUnit.test('new date entry has no clients', function(assert) {
      var dateEntry = new TimesheetDayEntry();

      assert.deepEqual(Object.keys(dateEntry), ['add'], 'Passed!');
    });

    QUnit.test('new date entry with one client duration', function(assert) {
      var dateEntry = new TimesheetDayEntry({aClient:5});
      
      assert.equal(dateEntry['aClient'], 5, 'Passed!');
    });

    QUnit.test('add client to empty date entry', function( assert ) {
      var dateEntry = new TimesheetDayEntry();
      dateEntry.add('aClient', 5);

      assert.equal(dateEntry['aClient'], 5, 'Passed!');
    });

    // QUnit.test('add client to date entry with same client', function( assert ) {
    //   var dateEntry = new TimesheetDayEntry(new Date(2019, 2, 18), { aClient: new TimesheetClientEntry('aClient', 7)});
    //   dateEntry.add('aClient', 5);

    //   assert.equal(dateEntry.durationFor('aClient'), 12);
    // });

  });

  // QUnit.module('TimesheetClientEntry', function() {
  //   QUnit.test('empty new client entry has zero duration', function( assert ) {
  //     var clientEntry = new TimesheetClientEntry('aClient');
  //     assert.equal(clientEntry.duration, 0, 'Passed!');
  //   });

  //   QUnit.test('add duration to empty new client', function( assert ) {
  //     var clientEntry = new TimesheetClientEntry('aClient');
  //     clientEntry.add(5);
  //     assert.equal(clientEntry.duration, 5, 'Passed!');
  //   });
  // });
});