
import { Timesheet, TimesheetDayEntry } from './Timesheet.js';

describe('TimesheetDayEntry', () => {

  test('new date entry is empty', () => {
    var dateEntry = new TimesheetDayEntry();

    expect(dateEntry.date()).toBeUndefined();
    expect(dateEntry.clients()).toEqual({});
  });

  test('new date entry with one client duration', () => {
    var dateEntry = new TimesheetDayEntry(new Date(2019, 4, 12), {aClient:5});
    
    expect(dateEntry.date()).toEqual(new Date(2019, 4, 12));
    expect(dateEntry.clients()).toEqual({aClient: 5});
  });

  test('add client to empty date entry', () => {
    var dateEntry = new TimesheetDayEntry();
    dateEntry.add('aClient', 5);

    expect(dateEntry.clients()).toEqual({aClient: 5});
  });

  test('add client to date entry with different client', () => {
    var dateEntry = new TimesheetDayEntry(new Date(), {clientA:7});
    dateEntry.add('clientB', 5);

    var expected = new TimesheetDayEntry(new Date(), {clientA:7,clientB:5});

    expect(dateEntry.clients()).toEqual({clientA: 7, clientB: 5});
  });

  test('add client to date entry with same client', () => {
    var dateEntry = new TimesheetDayEntry(new Date(), {aClient:7});
    dateEntry.add('aClient', 5);

    expect(dateEntry.clients()).toEqual({aClient: 12});
  });

  //TODO add describe for iterate
  test('iterate over empty day entry', () => {
    var dateEntry = new TimesheetDayEntry();
    var iterator = dateEntry.iterator();
    var actual = iterator.next();

    expect(actual.value).toBeUndefined();
    expect(actual.done).toBeTruthy();
  });

  test('iterate over one client', () => {
    var dateEntry = new TimesheetDayEntry(new Date(), {aClient:7});
    var iterator = dateEntry.iterator();
    var actual = iterator.next();

    expect(actual.value).toEqual({clientName: 'aClient', duration: 7});
    expect(actual.done).toBeFalsy();

    expect(iterator.next().done).toBeTruthy();
  });

  test('iterate over two clients', () => {
    var dateEntry = new TimesheetDayEntry(new Date(), {clientA:7, clientB:10});
    var iterator = dateEntry.iterator();

    expect(iterator.next().value).toEqual({clientName: 'clientA', duration: 7});
    expect(iterator.next().value).toEqual({clientName: 'clientB', duration: 10});
    expect(iterator.next().done).toBeTruthy();
  });

});

describe('Timesheet', () => {

  test('new timesheet is empty', () => {
    var timesheet = new Timesheet();

    expect(timesheet.timesheet()).toEqual([]);
  });

  test('new timesheet having one day', () => {
    var timesheet = new Timesheet([new TimesheetDayEntry(new Date(), {aClient:5})]);
    
    var expected = [new TimesheetDayEntry(new Date(), {aClient:5})];

    expect(JSON.stringify(timesheet.timesheet())).toBe(JSON.stringify(expected));
  });

  //TODO use Given-When-Then: given a timesheet is empty when adding a time entry
  test('when timesheet is empty add a time entry', () => {
    var timesheet = new Timesheet();

    var date = new Date(2019, 3, 5);
    timesheet.add(date, 'aClient', 201);

    var expected = [,,,,,new TimesheetDayEntry(new Date(), {aClient:201})];

    expect(JSON.stringify(timesheet.timesheet())).toBe(JSON.stringify(expected));
  });

  test('when timesheet has a day entry add a time entry for the same day', () => {
    var timesheet = new Timesheet([,,,,,new TimesheetDayEntry(new Date(), {clientA:5})]);

    var date = new Date(2019, 3, 5);
    timesheet.add(date, 'clientB', 201);

    var expected = [,,,,,new TimesheetDayEntry(new Date(), {clientA:5,clientB:201})];

    expect(JSON.stringify(timesheet.timesheet())).toBe(JSON.stringify(expected));
  });

  test('when timesheet has a day entry add a time entry for the same day and same client', () => {
    var timesheet = new Timesheet([,,,,,new TimesheetDayEntry(new Date(), {aClient:5})]);

    var date = new Date(2019, 3, 5);
    timesheet.add(date, 'aClient', 201);
    
    var expected = [,,,,,new TimesheetDayEntry(new Date(), {aClient:206})];

    expect(JSON.stringify(timesheet.timesheet())).toBe(JSON.stringify(expected));
  });

  test('given an empty timesheet', () => {
    var timesheet = new Timesheet();
    
    expect(timesheet.daysWorked()).toBe(0);
  });

  test('given a timesheet having a time entry with a duration longer than 2 hours', () => {
    const three_hours = 3*1000*60*60;
    var timesheet = new Timesheet([new TimesheetDayEntry(new Date(), {aClient:three_hours})]);
    
    expect(timesheet.daysWorked()).toBe(1);
  });

  //TODO add describe for iterate
  test('iterate over empty timesheet', () => {
    var timesheet = new Timesheet();

    var iterator = timesheet.iterator();

    expect(iterator.next().done).toBeTruthy();
  });

  test('iterate over timesheet having one kday', () => {
    var timesheet = new Timesheet([new TimesheetDayEntry(new Date(), {aClient:5})]);

    var iterator = timesheet.iterator();
    var item = iterator.next();

    expect(JSON.stringify(item.value)).toBe(JSON.stringify(new TimesheetDayEntry(new Date(), {aClient:5})));
    expect(item.done).toBeFalsy();

    expect(iterator.next().done).toBeTruthy();
  });

  test('iterate over timesheet having two subsequent days', () => {
    var timesheet = new Timesheet([new TimesheetDayEntry(new Date(), {clientA:5}), new TimesheetDayEntry(new Date(), {clientB:7})]);

    var iterator = timesheet.iterator();

    expect(JSON.stringify(iterator.next().value)).toBe(JSON.stringify(new TimesheetDayEntry(new Date(), {clientA:5})));
    expect(JSON.stringify(iterator.next().value)).toBe(JSON.stringify(new TimesheetDayEntry(new Date(), {clientB:7})));

    expect(iterator.next().done).toBeTruthy();
  });

  test('iterate over timesheet having two non-subsequent days', () => {
    var timesheet = new Timesheet([new TimesheetDayEntry(new Date(), {clientA:5}), , new TimesheetDayEntry(new Date(), {clientB:7})]);

    var iterator = timesheet.iterator();

    expect(JSON.stringify(iterator.next().value)).toBe(JSON.stringify(new TimesheetDayEntry(new Date(), {clientA:5})));
    expect(JSON.stringify(iterator.next().value)).toBe(JSON.stringify(new TimesheetDayEntry(new Date(), {clientB:7})));

    expect(iterator.next().done).toBeTruthy();
  });

  test('iterate over timesheet having one non-first day', () => {
    var timesheet = new Timesheet([,,,new TimesheetDayEntry(new Date(), {aClient:5})]);

    var iterator = timesheet.iterator();
    var item = iterator.next();

    expect(JSON.stringify(item.value)).toBe(JSON.stringify(new TimesheetDayEntry(new Date(), {aClient:5})));
    expect(item.done).toBeFalsy();

    expect(iterator.next().done).toBeTruthy();
  });
});
