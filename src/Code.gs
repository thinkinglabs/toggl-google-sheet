
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet for Month", functionName: "getTimesheetForMonth"} ];
  ss.addMenu("Toggl", menuEntries);
}

function getTimesheetForMonth() {

  var readConfiguration = new ReadConfiguration(SpreadsheetApp.getActive(), new Logging('ConfigurationLoader'));
  var config = readConfiguration.read();

  var timeZone = Session.getScriptTimeZone();
  Logger.log("script time zone: " + timeZone);

  var timesheetDate = config.timesheetDate;
  Logger.log("start date: " + timesheetDate);
  var startDate = new Date(timesheetDate.getYear(), timesheetDate.getMonth(), 1);
  var since = Utilities.formatDate(startDate, timeZone, "yyyy-MM-dd");
  Logger.log("since: " + since);

  var days = daysInMonth(startDate.getYear(), startDate.getMonth());

  var endDate = new Date(startDate.getYear(), startDate.getMonth(), days);
  Logger.log("end date: " + endDate);
  var until = Utilities.formatDate(endDate, timeZone, "yyyy-MM-dd");
  Logger.log("until: " + until);

  var renderer = new TimesheetRenderer(
    timeZone, 
    new FetchTimesheet(
      new Logging('FetchTimesheet'), 
      new TogglRepository(config.apiToken, new Requests(), new Base64(), new Logging('TogglRepository'))
    )
  );
  renderer.render(config.workspaceId, startDate, since, until);
}
