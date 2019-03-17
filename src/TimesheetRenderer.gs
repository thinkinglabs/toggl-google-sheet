
function TimesheetRenderer(fetchTimesheet) {

  this.fetchTimesheet = fetchTimesheet;

  this.render = function(workspaceId, startDate, since, until) {

    var timesheet = this.fetchTimesheet.execute(workspaceId, since, until);

    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = formatYYYYMM(startDate);

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
  };
}
