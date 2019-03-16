var SHT_CONFIG = 'Config';

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet for Month", functionName: "getTimesheetForMonth"} ];
  ss.addMenu("Toggl", menuEntries);
}

function getTimesheetForMonth() {

  var config = loadConfiguration(SpreadsheetApp.getActive(), SHT_CONFIG);

  var timeZone = Session.getScriptTimeZone();
  Logger.log("script time zone: " + timeZone);

  var timesheetDate = config.timesheetDate;
  Logger.log("start date: " + timesheetDate);
  var startDate = new Date(timesheetDate.getYear(), timesheetDate.getMonth(), 1);
  var since = Utilities.formatDate(startDate, timeZone, "yyyy-MM-dd");
  Logger.log("since: " + since);

  var days = daysOfMonth(startDate.getYear(), startDate.getMonth());

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

// based on the blog post "Insider Tips for using Apps Script and Spreadsheets"
// from the Google Apps Developer Blog
// http://googleappsdeveloper.blogspot.be/2012/05/insider-tips-for-using-apps-script-and.html
function loadConfiguration(wb, configSheet) {

  Logger.log("Loading configuration ...");

  var configsheet = wb.getSheetByName(configSheet);
  var result = new Array();

  var cfgdata = configsheet.getDataRange().getValues();
  for (i = 1; i < cfgdata.length; i++) {
    var key = cfgdata[i][0];
    var value = cfgdata[i][1];

    Logger.log("key: " + key + " - value: " + value);

    result[key] = value;
  }

  return result
}
