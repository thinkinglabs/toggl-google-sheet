var SHT_CONFIG = 'Config';

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet for Month", functionName: "getTimesheetForMonth"} ];
  ss.addMenu("Toggl", menuEntries);
}


function FetchTimesheet(togglRepository) {
  this.togglRepository = togglRepository;
}

FetchTimesheet.prototype.execute = fetchTimesheet;

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

  var fetchTimesheet = new FetchTimesheet(new TogglRepository());
  var timesheet = fetchTimesheet.execute(config.apiToken, config.workspaceId, since, until);
  createTimesheet(startDate, timeZone, timesheet);
}

function fetchTimesheet(apiToken, workspaceId, since, until) {

  var timesheet = [];

  var report = this.togglRepository.detailedReport(apiToken, workspaceId, since, until);
  Logger.log("total count: " + report.total_count + " - per page: " + report.per_page);
  var numberOfPages = Math.ceil(report.total_count/ report.per_page);
  Logger.log("number of pages: " + numberOfPages);
  var page = 1;
  do {
    for (var i = 0; i < report.data.length; i++) {
      var timeEntry = report.data[i];
      var client = timeEntry.client;
      var start = parseISODateTime(timeEntry.start);
      var duration = timeEntry.dur;

      if (!timesheet[start.getDate()]) {
        Logger.log("add " + start.getDate() + " to timesheet");
        timesheet[start.getDate()] = {};
      }
      var timesheetDay = timesheet[start.getDate()];
      if (!timesheetDay[client]) {
        Logger.log("add " + client + " to timesheet day " + start.getDate());
        timesheetDay[client] = duration;
      } else {
        timesheetDay[client] = timesheetDay[client] + duration;
      }

      Logger.log(client + " ["+start.getDate()+"]: " + timesheetDay[client]);
    }

    ++page;
    report = this.togglRepository.detailedReport(apiToken, workspaceId, since, until, page);
  } while (page <= numberOfPages);

  return timesheet;
}

function createTimesheet(startDate, timeZone, timesheet) {

  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = Utilities.formatDate(startDate, timeZone, "yyyyMM");

  var sheet = activeSpreadsheet.getSheetByName(sheetName);
  if (sheet) {
    activeSpreadsheet.deleteSheet(sheet);
  }

  var sheet = activeSpreadsheet.insertSheet(sheetName, activeSpreadsheet.getSheets().length);

  var titles = sheet.getRange(1, 1, 1, 3);
  titles.setValues([["Date", "Customer", "Duration"]]);
  titles.setFontWeights([["bold", "bold", "bold"]]);

  var mc = sheet.getRange(2, 5);
  mc.setValue("#MC");
  mc.setFontWeight("bold");

  var numberOfMealVouchers = 0;

  var row = 2
  for (var i = 0; i < timesheet.length; i++) {

    var timesheetDay = timesheet[i];
    var durationInHours = 0;
    for (var property in timesheetDay) {
      if (timesheetDay.hasOwnProperty(property)) {
        var start = new Date(startDate.getYear(), startDate.getMonth(), i);
        var client = property;
        var duration = millisToDuration(timesheetDay[property]);
        durationInHours = durationInHours + millisToDecimalHours(timesheetDay[property]);

        sheet.getRange(row, 1, 1, 3).setValues([[start, client, duration]]);
        sheet.getRange(row, 1).setNumberFormat("dd/MM/yyyy")
        ++row;
      }
    }

    if (durationInHours >= 2) {
      ++numberOfMealVouchers;
    }
  }

  sheet.getRange(2,6).setValue(numberOfMealVouchers);

  sheet.autoResizeColumn(1);
  sheet.autoResizeColumn(2);
  sheet.autoResizeColumn(3);
  sheet.autoResizeColumn(5);
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
