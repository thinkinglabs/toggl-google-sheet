
QUnit.module('Timesheet', function() {

  QUnit.module('TimesheetDateEntry', function() {

    QUnit.test('new date entry is empty', function(assert) {
      var dateEntry = new TimesheetDayEntry();

      assert.deepEqual(Object.keys(dateEntry), ['add', 'getDurationFor'], 'Passed!');
    });

    QUnit.test('new date entry with one client duration', function(assert) {
      var dateEntry = new TimesheetDayEntry({aClient:5});
      
      assert.equal(dateEntry.getDurationFor('aClient'), 5, 'Passed!');
    });

    QUnit.test('add client to empty date entry', function( assert ) {
      var dateEntry = new TimesheetDayEntry();
      dateEntry.add('aClient', 5);

      assert.equal(dateEntry.getDurationFor('aClient'), 5, 'Passed!');
    });

    QUnit.test('add client to date entry with different client', function( assert ) {
      var dateEntry = new TimesheetDayEntry({clientA:7});
      dateEntry.add('clientB', 5);

      var expected = new TimesheetDayEntry({clientA:7,clientB:5});

      assert.equal(dateEntry.getDurationFor('clientA'), 7, 'Passed!');
      assert.equal(dateEntry.getDurationFor('clientB'), 5, 'Passed!');
    });

    QUnit.test('add client to date entry with same client', function( assert ) {
      var dateEntry = new TimesheetDayEntry({aClient:7});
      dateEntry.add('aClient', 5);

      assert.equal(dateEntry.getDurationFor('aClient'), 12, 'Passed!');
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

    QUnit.test('when timesheet is empty add a time entry', function( assert ) {
      var timesheet = new Timesheet();

      var date = new Date(2019, 3, 5);
      timesheet.add(date, 'aClient', 201);

      assert.deepEqual(timesheet.timesheet(), [,,,,,new TimesheetDayEntry({aClient:201})], 'Passed!');
    });

    QUnit.test('when timesheet has a day entry add a time entry for the same day', function( assert ) {
      var timesheet = new Timesheet([,,,,,new TimesheetDayEntry({clientA:5})]);

      var date = new Date(2019, 3, 5);
      timesheet.add(date, 'clientB', 201);

      assert.deepEqual(timesheet.timesheet(), [,,,,,new TimesheetDayEntry({clientA:5,clientB:201})], 'Passed!');
    });

    QUnit.test('when timesheet has a day entry add a time entry for the same day and same client', function( assert ) {
      var timesheet = new Timesheet([,,,,,new TimesheetDayEntry({aClient:5})]);

      var date = new Date(2019, 3, 5);
      timesheet.add(date, 'aClient', 201);

      assert.deepEqual(timesheet.timesheet(), [,,,,,new TimesheetDayEntry({aClient:206})], 'Passed!');
    });

  });
});