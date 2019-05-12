
function TimesheetRenderer(fetchTimesheet) {

  this.fetchTimesheet = fetchTimesheet;

  this.render = function(workspaceId, timesheetDate) {

    var timesheet = this.fetchTimesheet.execute(workspaceId, timesheetDate);

    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = formatYYYYMM(timesheetDate);

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
      if (timesheetDay) {
        var start = timesheetDay.date();
        var iterator = timesheetDay.iterator();
        var durationInHours = 0;
        for(var item = iterator.next(); !item.done; item = iterator.next()) {
          var duration = millisToDuration(item.value.duration);
          durationInHours = durationInHours + millisToDecimalHours(item.value.duration);

          sheet.getRange(row, 1, 1, 3).setValues([[start, item.value.clientName, duration]]);
          sheet.getRange(row, 1).setNumberFormat("dd/MM/yyyy")
          ++row;
        }

        if (durationInHours >= 2) {
          ++numberOfMealVouchers;
        }
      }
    }

    sheet.getRange(2,6).setValue(numberOfMealVouchers);

    sheet.autoResizeColumn(1);
    sheet.autoResizeColumn(2);
    sheet.autoResizeColumn(3);
    sheet.autoResizeColumn(5);
  };
}
