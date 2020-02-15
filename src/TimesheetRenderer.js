import { formatYYYYMM, millisToDuration, millisToDecimalHours } from './Dates.js';

function TimesheetRenderer(fetchTimesheet, googleSheetAdapter) {

  this.fetchTimesheet = fetchTimesheet;

  this.render = function(workspaceId, timesheetDate) {

    var timesheet = this.fetchTimesheet.execute(workspaceId, timesheetDate);

    var sheetName = formatYYYYMM(timesheetDate);

    var sheet = googleSheetAdapter.replaceOrAppendSheet(sheetName);
    
    sheet.renderTitles([["Date", "Customer", "Duration"]])
    
    var mc = sheet.sheet.getRange(2, 5);
    mc.setValue("#MC");
    mc.setFontWeight("bold");

    var numberOfMealVouchers = 0;
    var row = 2

    var timesheetIterator = timesheet.iterator();

    for (var timesheetDay = timesheetIterator.next(); !timesheetDay.done; timesheetDay = timesheetIterator.next()) {

      var start = timesheetDay.value.date();
      var durationInHours = 0;

      var clientsIterator = timesheetDay.value.iterator();

      for(var item = clientsIterator.next(); !item.done; item = clientsIterator.next()) {
        var duration = millisToDuration(item.value.duration);
        durationInHours = durationInHours + millisToDecimalHours(item.value.duration);

        sheet.sheet.getRange(row, 1, 1, 3).setValues([[start, item.value.clientName, duration]]);
        sheet.sheet.getRange(row, 1).setNumberFormat("dd/MM/yyyy")
        ++row;
      }

      if (durationInHours >= 2) {
        ++numberOfMealVouchers;
      }
    }

    sheet.sheet.getRange(2,6).setValue(numberOfMealVouchers);

    sheet.sheet.autoResizeColumn(1);
    sheet.sheet.autoResizeColumn(2);
    sheet.sheet.autoResizeColumn(3);
    sheet.sheet.autoResizeColumn(5);
  };
}

export { TimesheetRenderer };
