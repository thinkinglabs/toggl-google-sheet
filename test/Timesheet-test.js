
QUnit.module('Timesheet', function() {

  QUnit.module('TimesheetDayEntry', function() {

    QUnit.test('new date entry is empty', function(assert) {
      var dateEntry = new TimesheetDayEntry();

      assert.deepEqual(dateEntry.clients(), {}, 'Passed!');
    });

    QUnit.test('new date entry with one client duration', function(assert) {
      var dateEntry = new TimesheetDayEntry({aClient:5});
      
      assert.equal(dateEntry.clients()['aClient'], 5, 'Passed!');
    });

    QUnit.test('add client to empty date entry', function( assert ) {
      var dateEntry = new TimesheetDayEntry();
      dateEntry.add('aClient', 5);

      assert.equal(dateEntry.clients()['aClient'], 5, 'Passed!');
    });

    QUnit.test('add client to date entry with different client', function( assert ) {
      var dateEntry = new TimesheetDayEntry({clientA:7});
      dateEntry.add('clientB', 5);

      var expected = new TimesheetDayEntry({clientA:7,clientB:5});

      assert.equal(dateEntry.clients()['clientA'], 7, 'Passed!');
      assert.equal(dateEntry.clients()['clientB'], 5, 'Passed!');
    });

    QUnit.test('add client to date entry with same client', function( assert ) {
      var dateEntry = new TimesheetDayEntry({aClient:7});
      dateEntry.add('aClient', 5);

      assert.equal(dateEntry.clients()['aClient'], 12, 'Passed!');
    });

    QUnit.test('iterate over empty day entry', function( assert ) {
      var dateEntry = new TimesheetDayEntry();
      var iterator = dateEntry.iterator();
      var actual = iterator.next();

      assert.deepEqual(actual.value, undefined, 'Passed!');
      assert.ok(actual.done, 'Passed!');
    });

    QUnit.test('iterate over one client', function( assert ) {
      var dateEntry = new TimesheetDayEntry({aClient:7});
      var iterator = dateEntry.iterator();
      var actual = iterator.next();

      assert.deepEqual(actual.value, {clientName: 'aClient', duration: 7}, 'Passed!');
      assert.notOk(actual.done, 'Passed!');

      assert.ok(iterator.next().done, 'Passed!');
    });

    QUnit.test('iterate over two clients', function( assert ) {
      var dateEntry = new TimesheetDayEntry({clientA:7, clientB:10});
      var iterator = dateEntry.iterator();

      assert.deepEqual(iterator.next().value, {clientName: 'clientA', duration: 7}, 'Passed!');
      assert.deepEqual(iterator.next().value, {clientName: 'clientB', duration: 10}, 'Passed!');
      assert.ok(iterator.next().done, 'Passed!');
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

    QUnit.test('iterate over empty timesheet', function( assert ) {
      var timesheet = new Timesheet();

      var iterator = timesheet.iterator();

      assert.ok(iterator.next().done, 'Passed!');
    });

    QUnit.test('iterate over timesheet having one kday', function( assert ) {
      var timesheet = new Timesheet([new TimesheetDayEntry({aClient:5})]);

      var iterator = timesheet.iterator();
      var item = iterator.next();

      assert.deepEqual(item.value, new TimesheetDayEntry({aClient:5}), 'Passed!');
      assert.notOk(item.done, 'Passed!');

      assert.ok(iterator.next().done, 'Passed!');
    });

    QUnit.test('iterate over timesheet having two subsequent days', function( assert ) {
      var timesheet = new Timesheet([new TimesheetDayEntry({clientA:5}), new TimesheetDayEntry({clientB:7})]);

      var iterator = timesheet.iterator();

      assert.deepEqual(iterator.next().value, new TimesheetDayEntry({clientA:5}), 'Passed!');
      assert.deepEqual(iterator.next().value, new TimesheetDayEntry({clientB:7}), 'Passed!');

      assert.ok(iterator.next().done, 'Passed!');
    });

    QUnit.test('iterate over timesheet having two non-subsequent days', function( assert ) {
      var timesheet = new Timesheet([new TimesheetDayEntry({clientA:5}), , new TimesheetDayEntry({clientB:7})]);

      var iterator = timesheet.iterator();

      assert.deepEqual(iterator.next().value, new TimesheetDayEntry({clientA:5}), 'Passed!');
      assert.deepEqual(iterator.next().value, new TimesheetDayEntry({clientB:7}), 'Passed!');

      assert.ok(iterator.next().done, 'Passed!');
    });

    QUnit.test('iterate over timesheet having one non-first day', function( assert ) {
      var timesheet = new Timesheet([,,,new TimesheetDayEntry({aClient:5})]);

      var iterator = timesheet.iterator();
      var item = iterator.next();

      assert.deepEqual(item.value, new TimesheetDayEntry({aClient:5}), 'Passed!');
      assert.notOk(item.done, 'Passed!');

      assert.ok(iterator.next().done, 'Passed!');
    });
  });
});