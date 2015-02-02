function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet for Month", functionName: "action"}                  ];
  ss.addMenu("Toggl", menuEntries);
}


function action() {
  
  var startDate = SpreadsheetApp.getActiveSheet().getRange(1,2).getValue();
  var since = Utilities.formatDate(startDate, "GMT+01:00", "yyyy-MM-dd");
  
  Logger.log("start date: " + since);
  var days = daysOfMonth(startDate.getYear(), startDate.getMonth());
  var endDate = new Date(startDate.getYear(), startDate.getMonth(), days);
  var until = Utilities.formatDate(endDate, "GMT+01:00", "yyyy-MM-dd");
  Logger.log("end date: " + until);
  
  
  var timesheet = fetchTimesheet(since, until);
  createTimesheet(startDate, timesheet);
}

function fetchTimesheet(since, until) {
  
  var timesheet = [];
  
  var report = fetchReport(since, until);
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
    report = fetchReport(since, until, page);
  } while (page <= numberOfPages);
  
  return timesheet;
}

function createTimesheet(startDate, timesheet) {
  
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = Utilities.formatDate(startDate, "GMT+01:00", "yyyyMM");
  
  var sheet = activeSpreadsheet.getSheetByName(sheetName);
  if (sheet) {
    activeSpreadsheet.deleteSheet(sheet);
  }
  
  var sheet = activeSpreadsheet.insertSheet(sheetName);
  
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

