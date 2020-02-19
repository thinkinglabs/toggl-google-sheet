import { formatYYYYMM, millisToDuration, millisToDecimalHours } from './Dates.js';

function TimesheetRenderer(fetchTimesheet, googleSheetAdapter) {

  this.fetchTimesheet = fetchTimesheet;

  this.render = function(workspaceId, timesheetDate) {

    var timesheet = this.fetchTimesheet.execute(workspaceId, timesheetDate);

    var sheetName = formatYYYYMM(timesheetDate);

    var sheet = googleSheetAdapter.replaceOrAppendSheet(sheetName);
    
    sheet.renderTitles("Date", "Customer", "Duration")
    
    var numberOfDaysWorked = 0;
    var row = 2

    var timesheetIterator = timesheet.iterator();

    for (let timesheetIteratorItem = timesheetIterator.next(); !timesheetIteratorItem.done; timesheetIteratorItem = timesheetIterator.next()) {
      
      let timesheetDay = timesheetIteratorItem.value;
      var day = timesheetDay.date();
      var durationInHours = 0;

      var clientsIterator = timesheetDay.iterator();

      for(var item = clientsIterator.next(); !item.done; item = clientsIterator.next()) {
        var duration = millisToDuration(item.value.duration);
        durationInHours = durationInHours + millisToDecimalHours(item.value.duration);

        sheet.renderRow(row, day, item.value.clientName, duration);
        ++row;
      }

      if (durationInHours >= 2) {
        ++numberOfDaysWorked;
      }
    }
    sheet.autoResizeColumns();

    sheet.renderDaysWorked(numberOfDaysWorked);
  };
}

export { TimesheetRenderer };
