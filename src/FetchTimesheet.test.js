import { FetchTimesheet } from './FetchTimesheet.js'
import { TimeEntry } from './TogglRepository.js';
import { Timesheet, TimesheetDayEntry } from './Timesheet.js';

describe('FetchTimesheet', () => {

  function MockLogger() {
    this.log = function() {};
  }

  function MockToggleRepository(result) {
    this.detailedReport = function(workspaceId, since, until) {
      return result;
    }
  }

  test("one client on one day having one entry", () => {

    var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
      new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 5)
    ]));

    var actual = fetchTimesheet.execute('aWorkspaceId', new Date(2019, 2, 1));
    var expected = new Timesheet([, new TimesheetDayEntry(new Date(2019, 2, 1), {aClient:5})]);
    
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
  });

  test("one client on one day having multiple entries", () => {

    var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
      new TimeEntry('aClient', new Date(2019, 2, 1, 9, 5), 5),
      new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 10),
      new TimeEntry('aClient', new Date(2019, 2, 1, 11, 21), 14)
    ]));

    var actual = fetchTimesheet.execute('aWorkspaceId', new Date(2019, 2, 1));
    var expected = new Timesheet([, new TimesheetDayEntry(new Date(2019, 2, 1), {aClient:29})]);
    
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
  });

  test("two clients on one day having one entry", () => {

    var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
      new TimeEntry('clientA', new Date(2019, 2, 1, 10, 2), 5),
      new TimeEntry('clientB', new Date(2019, 2, 1, 9, 5), 6)
    ]));

    var actual = fetchTimesheet.execute('aWorkspaceId', new Date(2019, 2, 1));
    var expected = new Timesheet([, new TimesheetDayEntry(new Date(2019, 2, 1), {clientA:5, clientB:6})]);
    
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected))
  });

  test("two clients on one day having multiple entries", () => {

    var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
      new TimeEntry('clientA', new Date(2019, 2, 1, 9, 1), 5),
      new TimeEntry('clientB', new Date(2019, 2, 1, 9, 5), 6),
      new TimeEntry('clientA', new Date(2019, 2, 1, 10, 2), 10),
      new TimeEntry('clientB', new Date(2019, 2, 1, 10, 11), 11),
    ]));

    var actual = fetchTimesheet.execute('aWorkspaceId', new Date(2019, 2, 1));
    var expected = new Timesheet([, new TimesheetDayEntry(new Date(2019, 2, 1), {clientA:15, clientB:17})]);
    
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
  });

  test("one client on two days having one entry", () => {

    var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
      new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 5),
      new TimeEntry('aClient', new Date(2019, 2, 3, 9, 5), 6)
    ]));

    var actual = fetchTimesheet.execute('aWorkspaceId', new Date(2019, 2, 1));
    var expected = new Timesheet([, new TimesheetDayEntry(new Date(2019, 2, 1), {aClient:5}), , new TimesheetDayEntry(new Date(2019, 2, 3), {aClient:6})]);
    
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
  });

  test("one client on two days having multiple entries", () => {

    var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
      new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 5),
      new TimeEntry('aClient', new Date(2019, 2, 1, 11, 9), 7),
      new TimeEntry('aClient', new Date(2019, 2, 3, 9, 5), 6),
      new TimeEntry('aClient', new Date(2019, 2, 3, 12, 13), 8)
    ]));

    var actual = fetchTimesheet.execute('aWorkspaceId', new Date(2019, 2, 1));
    var expected = new Timesheet([, new TimesheetDayEntry(new Date(2019,2,1), {aClient:12}), , new TimesheetDayEntry(new Date(2019, 2, 3), {aClient:14})]);
    
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
  });

});
