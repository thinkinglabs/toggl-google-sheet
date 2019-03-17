
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

function ReadConfiguration(spreadSheet, logger) {
  this.spreadSheet = spreadSheet;
  this.logger = logger

  var SHT_CONFIG = 'Config';

  // based on the blog post "Insider Tips for using Apps Script and Spreadsheets"
  // from the Google Apps Developer Blog
  // http://googleappsdeveloper.blogspot.be/2012/05/insider-tips-for-using-apps-script-and.html
  this.read = function() {

    this.logger.log("Reading configuration ...");

    var configsheet = this.spreadSheet.getSheetByName(SHT_CONFIG);
    var result = {};

    var cfgdata = configsheet.getDataRange().getValues();
    for (i = 1; i < cfgdata.length; i++) {
      var key = cfgdata[i][0];
      var value = cfgdata[i][1];

      this.logger.log("key: " + key + " - value: " + value);

      result[key] = value;
    }

    return result
  };

}

