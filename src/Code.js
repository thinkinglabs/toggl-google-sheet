function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet for Month", functionName: "getTimesheetForMonth"} ];
  ss.addMenu("Toggl", menuEntries);
}

function getTimesheetForMonth() {
  app.getTimesheetForMonth();
}
