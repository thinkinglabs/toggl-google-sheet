
QUnit.module('Timesheet', function() {

  QUnit.module('TimesheetDateEntry', function() {

    QUnit.test('new date entry is empty', function(assert) {
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

    QUnit.test('add client to date entry with existing client', function( assert ) {
      var dateEntry = new TimesheetDayEntry({aClient:7});
      dateEntry.add('aClient', 5);

      assert.equal(dateEntry['aClient'], 12, 'Passed!');
    });

  });

  QUnit.module('Timesheet', function() {

    QUnit.test('new timesheet is empty', function( assert ) {
      var timesheet = new Timesheet();

      assert.deepEqual(timesheet.timesheet(), [], 'Passed!');
    });

    QUnit.test('new timesheet having one day', function( assert ) {
      var timesheet = new Timesheet([new TimesheetDayEntry({aClient:5})]);
      
      var expected = [new TimesheetDayEntry({aClient:5})];

      assert.deepEqual(timesheet.timesheet(), expected, 'Passed!');
    });

    QUnit.test('hasDaysOfMonth returns true', function( assert ) {
      var timesheet = new Timesheet([,new TimesheetDayEntry({aClient:5})]);

      assert.ok(timesheet.hasDayOfMonth(1), 'Passed!');
    });

    QUnit.test('create day entry for a given day of month', function( assert ) {
      var timesheet = new Timesheet();

      timesheet.create(2);

      assert.deepEqual(timesheet.timesheet(), [,,new TimesheetDayEntry()], 'Passed!');
    });

    QUnit.test('get day entry for a given day of month', function( assert ) {
      var timesheet = new Timesheet([,,new TimesheetDayEntry({aClient:5})]);

      var actual = timesheet.get(2);

      assert.deepEqual(actual, new TimesheetDayEntry({aClient:5}), 'Passed!');
    });

    QUnit.test('when creating a day entry hasDayOfMonth(1) should be true', function( assert ) {
      var timesheet = new Timesheet();

      timesheet.create(1);

      assert.ok(timesheet.hasDayOfMonth(1), 'Passed!');
    });

    QUnit.test('when creating a day entry not hasDayOfMonth(1) should be false', function( assert ) {
      var timesheet = new Timesheet();

      timesheet.create(1);

      assert.notOk(!timesheet.hasDayOfMonth(1), 'Passed!');
    });

    QUnit.test('when timesheet is empty add a time entry', function( assert ) {
      var timesheet = new Timesheet();

      var startDate = new Date(2019, 3, 5);
      timesheet.add(startDate, 'aClient', 201);

      assert.deepEqual(timesheet.timesheet(), [,,,,,new TimesheetDayEntry({aClient:201})]);
    });

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