
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet for Month", functionName: "getTimesheetForMonth"} ];
  ss.addMenu("Toggl", menuEntries);
}

function getTimesheetForMonth() {

  var readConfiguration = new ReadConfiguration(SpreadsheetApp.getActive(), new Logging('ConfigurationLoader'));
  var config = readConfiguration.read();

  var timesheetDate = config.timesheetDate;
  Logger.log("timesheet date: " + timesheetDate);

  var renderer = new TimesheetRenderer(
    new FetchTimesheet(
      new Logging('FetchTimesheet'), 
      new TogglRepository(config.apiToken, new Requests(), new Base64(), new Logging('TogglRepository'))
    )
  );
  renderer.render(config.workspaceId, timesheetDate);
}
